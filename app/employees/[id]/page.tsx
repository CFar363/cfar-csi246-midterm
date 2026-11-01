import { redirect } from "next/navigation";
import Link from "next/link";

//Edit is a very similar operation to add
//The only difference is that we are editing an existing employee
//We will use a similar form for both operations
//First we need to fetch the employee data and pass it to the form
//The action will update the employee data

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: employeeId } = await params;
  const id = Number(employeeId);
  const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "EMployee not found");
  }

  const employee = await response.json();

  // Server action to handle updating an employee
  async function handleUpdateEmployee(formData: FormData) {
    "use server";

    const updatedEmployee = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      salary: Number(formData.get("salary")),
      dob: Number(formData.get("dob")),
    };

    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    });
    //error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update employee");
    }

    redirect("/employees");
  }

  //sercer action for deleting an employee
  async function handleDeleteEmployee() {
    "use server";

    const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
      method: "DELETE",
    });
    //error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete employee");
    }

    redirect("/employees");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Employee Page</h2>
      <form action={handleUpdateEmployee}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={employee.name}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <input
            type="text"
            name="role"
            placeholder="Role"
            defaultValue={employee.role}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            defaultValue={employee.salary}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <input
            type="number"
            name="dob"
            placeholder="Date of Birth"
            defaultValue={employee.dob}
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm Edit
          </button>
        </div>
      </form>
      <div>
        <form action={handleDeleteEmployee}>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Employee
          </button>
        </form>
        <div>
          <Link
            href="/employees"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Return
          </Link>
        </div>
      </div>
    </div>
  );
}
