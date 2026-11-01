import { NextResponse } from "next/server";
import { getEmployeeById, updateEmployee, deleteEmployee } from "@/app/lib/db";

// In Next.js dynamic routes, [id] in the folder name creates a dynamic parameter
// The { params } object is automatically populated by Next.js based on the URL
// Example: /api/posts/123 -> params.id will be "123"
// The destructuring { params }: { params: { id: string } } does two things:
// 1. Extracts the params object from the route parameters
// 2. Defines its type as an object containing id of type string

//This is get by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    // Convert the string ID from the URL to a number for our database function
    const employee = await getEmployeeById(parseInt(id));
    return NextResponse.json(employee);
  } catch (error) {
    // If employee isn't found or other error occurs, return 404 with error message
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 },
    );
  }
}

//update we need an ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    // Parse the JSON body from the request to get the update data
    const updates = await request.json();
    // Update the employee and get the updated version back
    const employee = await updateEmployee(parseInt(id), updates);
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    // Delete the employee with the specified ID
    await deleteEmployee(parseInt(id));
    // Return success message (no content to return since it's deleted)
    return NextResponse.json({ message: "Employee data deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 },
    );
  }
}
