import { Employee } from "../types/Employee";

//   id: number;
//   name: string;
//   role: string;
//   salary: number;
//   dob: number;

let employees: Employee[] = [
  { id: 1, name: "Edward Brown", role: "Janitor", salary: 30000, dob: 2000 },
  {
    id: 2,
    name: "Wallace Breen",
    role: "Administrator",
    salary: 90000,
    dob: 1970,
  },
  { id: 3, name: "Kelly Smith", role: "Data Entry", salary: 45000, dob: 1999 },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getEmployees() {
  await delay(500);
  return [...employees];
}

let ghostbustersID = Math.max(...employees.map((employee) => employee.id)) + 1;

//Take in a Employee without an ID
export async function createEmployee(employee: Omit<Employee, "id">) {
  await delay(500);
  const newEmployee = {
    //id: Math.max(...employees.map((employee) => employee.id)) + 1,
    id: ghostbustersID,
    ...employee,
  };

  ghostbustersID++; //ghostbusters ghost id

  employees.push(newEmployee);
  return newEmployee;
}

export async function getEmployeeById(id: number) {
  await delay(500);
  // Find the employee with matching id
  const employee = employees.find((p) => p.id === id);
  // If no employee found, throw an error
  if (!employee) throw new Error(`Employee with id ${id} not found`);
  // Return a copy of the employee to prevent direct mutations
  return { ...employee };
}

export async function deleteEmployee(id: number) {
  await delay(500);
  // Find the position of the employee in the array
  const index = employees.findIndex((p) => p.id === id);
  // If employee doesn't exist, throw an error
  if (index === -1) throw new Error(`Employee with id ${id} not found`);
  // Remove the employee from the array using splice
  employees.splice(index, 1);
}

export async function updateEmployee(
  id: number,
  updates: Omit<Employee, "id">,
) {
  await delay(500);
  // Find the position of the employee in the array
  const index = employees.findIndex((p) => p.id === id);
  // If employee doesn't exist, throw an error
  if (index === -1) throw new Error(`Employee with id ${id} not found`);
  // Merge the existing employee with the updates
  // The spread operator (...) is used to create a new object with all properties
  employees[index] = { ...employees[index], ...updates };
  //console log test of pain and suffering
  console.log("Updated employee:", employees[index]);
  // Return a copy of the updated employee
  return { ...employees[index] };
}
