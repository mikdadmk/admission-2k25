// admission-management/src/app/api/register/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { uid, userName, email, contact, institute } = await req.json();
        const client = await clientPromise;
        const db = client.db("admission_management");

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email });
        let role = "user"; // Default role is user

        if (!existingUser) {
            const adminExists = await db.collection("users").findOne({ role: "admin" });
            const subadminExists = await db.collection("users").findOne({ role: "subadmin" });

            if (!adminExists) {
                role = "admin"; // First user becomes admin
            } else if (!subadminExists) {
                role = "subadmin"; // Second unique user becomes subadmin
            }
        } else {
            role = existingUser.role; // Maintain existing role from database
        }

        // Store or update user in MongoDB with the correct role
        await db.collection("users").updateOne(
            { email },
            { $set: { uid, userName, email, contact, institute, role } },
            { upsert: true }
        );

        return NextResponse.json({ message: "User registered successfully", role }, { status: 200 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
