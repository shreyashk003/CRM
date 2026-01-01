import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, industry, email, phone } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("crm");

    await db.collection("companies").insertOne({
      name,
      industry,
      email,
      phone,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Company created successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("crm");

    const companies = await db
      .collection("companies")
      .find({})
      .toArray();

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
