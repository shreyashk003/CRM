import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("crm");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = NextResponse.json({ message: "Login successful", role: user.role });

    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
