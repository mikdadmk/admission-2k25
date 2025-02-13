"use client";

import { useState } from "react";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User registered:", user.uid);

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, email: user.email }),
            });

            router.push("/login");
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            console.log("Google Sign-up:", user.uid);

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, email: user.email }),
            });

            router.push("/");
        } catch (error) {
            console.error("Google Sign-up error:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
        </div>
    );
}
