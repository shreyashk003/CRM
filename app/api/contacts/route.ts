import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("crm");

  const contacts = await db
    .collection("contacts")
    .aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "companyId",
          foreignField: "_id",
          as: "company"
        }
      },
      { $unwind: "$company" }
    ])
    .toArray();

  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const { name, email, phone, companyId } = await req.json();

  const client = await clientPromise;
  const db = client.db("crm");

  await db.collection("contacts").insertOne({
    name,
    email,
    phone,
    companyId: new ObjectId(companyId),
    createdAt: new Date()
  });

  return NextResponse.json({ message: "Contact created" });
}
