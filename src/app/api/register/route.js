import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { uid, email } = await req.json();
        const client = await clientPromise;
        const db = client.db("admission_management");

        // Check if an admin exists
        const adminExists = await db.collection("users").findOne({ role: "admin" });
        const role = adminExists ? "user" : "admin";

        // Store user in MongoDB
        await db.collection("users").insertOne({ uid, email, role });

        return NextResponse.json({ message: "User registered successfully", role }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
