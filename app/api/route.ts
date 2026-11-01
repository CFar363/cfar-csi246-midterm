import { NextResponse } from "next/server";
//export function whose name matches the type of request that you want to respond to
//GET POST PUT DELETE PATCH
//this will fire when someone goes to /api
//Inside of a given route you can only have one GET()
export async function GET() {
  return NextResponse.json({ message: "Welcome to api" });
}
