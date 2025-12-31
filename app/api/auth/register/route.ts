import clientPromise from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, role } = body;

  // Basic validation
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db("crm");

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    role: role || "rep",
    createdAt: new Date(),
  });

  return NextResponse.json({
    message: "User registered successfully",
  });
}
