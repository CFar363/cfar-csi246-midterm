import { NextResponse } from "next/server";
import { getEmployees, createEmployee } from "@/app/lib/db";

// GET handler for fetching all employees
// If I export a function named GET, it will be used as the GET handler for the API route
// I cannot do a GetByID in the same route because I cannot have two GET handlers
export async function GET() {
  try {
    const employees = await getEmployees();
    //console log test of pain and suffering
    console.log("employued returned by GET:", employees);
    //
    return NextResponse.json(employees);
  } catch (error) {
    // Return error message
    return NextResponse.json(
      { error: "Failed to fetch employee" },
      { status: 500 },
    );
  }
}

// POST handler for creating new employees
export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();

    // Validate the request body
    if (!body.name || !body.role || !body.salary || !body.dob) {
      return NextResponse.json(
        { error: "name, role, salary and date of birth are required" },
        { status: 400 },
      );
    }

    // Create the new employee
    const newEmployee = await createEmployee({
      name: body.name,
      role: body.role,
      salary: body.salary,
      dob: body.dob,
    });

    // Return the created employee with a 201 status code
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    // Return a proper error response
    return NextResponse.json(
      { error: "Failed to create Employee" },
      { status: 500 },
    );
  }
}
