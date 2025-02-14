import { NextResponse } from "next/server";
import { auth, signInWithEmailAndPassword } from "@/lib/firebase";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        // Sign in the user with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch the user from MongoDB
        const client = await clientPromise;
        const db = client.db("admission_management");
        const dbUser = await db.collection("users").findOne({ email });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ role: dbUser.role, redirectTo: dbUser.role === "admin" ? "/admin" : dbUser.role === "subadmin" ? "/subadmin" : "/user" }, { status: 200 });
    } catch (error) {
        console.error("Login Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
