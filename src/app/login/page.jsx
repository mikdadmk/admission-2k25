// admission-management/src/app/login/page.jsx
"use client";

import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { user, role } = useAuth();

    useEffect(() => {
        if (user && role) {
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            router.push(redirectTo);
        }
    }, [user, role, router]);

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Please enter email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role from MongoDB
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const redirectTo = data.role === "admin" ? "/admin" : data.role === "subadmin" ? "/subadmin" : "/user";
                router.push(redirectTo);
            } else {
                setErrorMessage(data.error || "Login failed.");
            }
        } catch (error) {
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" 
                />
                <button 
                    onClick={handleLogin} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg transition duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
