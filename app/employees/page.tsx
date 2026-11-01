"use client";

import { useState, useEffect } from "react";
import { Employee } from "../types/Employee";
import Link from "next/link";

export default function page() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    salary: 0,
    dob: 0,
  });

  // Function to fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle creating a new employee
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create employee");
      }

      // Clear the form
      setNewEmployee({ name: "", role: "", salary: 0, dob: 0 });

      // Refresh the employee list
      await fetchEmployees();
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create Employee",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-700 border-l-4 border-blue-500 pl-2">
      <h2 className="text-2xl font-semibold mb-4">Employee Registry</h2>

      {/* Create employee Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Create New Employee
        </h3>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-1">
            Role:
          </label>
          <textarea
            id="role"
            value={newEmployee.role}
            onChange={(e) =>
              setNewEmployee((prev) => ({ ...prev, role: e.target.value }))
            }
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="salary" className="block mb-1">
            Salary:
          </label>
          <input
            id="salary"
            type="number"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee((prev) => ({
                ...prev,
                salary: Number(e.target.value),
              }))
            }
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block mb-1">
            Date of Birth:
          </label>
          <input
            id="dob"
            type="number"
            value={newEmployee.dob}
            onChange={(e) =>
              setNewEmployee((prev) => ({
                ...prev,
                dob: Number(e.target.value),
              }))
            }
            required
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Creating..." : "Create Employee"}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className="text-red-500 mb-4 p-2 border border-red-300 rounded">
          Error: {error}
        </div>
      )}

      {/* Employee List */}
      <div>
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Existing Employees
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {employees.map((employee) => (
              <li key={employee.id} className="border-b pb-2">
                <a href={`/employees/${employee.id}`}>
                  <h4 className="font-semibold">Name: {employee.name}</h4>
                  <p className="text-gray-600">Position: {employee.role}</p>
                  <p className="text-gray-600">Salary: ${employee.salary}</p>
                  <p className="text-gray-600">Birth Year: {employee.dob}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
