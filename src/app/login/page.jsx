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
    const { user, role, setUser, setRole } = useAuth();

    useEffect(() => {
        if (user && role) {
            console.log(`🔹 Redirecting to ${role} page`);
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            router.push(redirectTo);
        }
    }, [user, role, router]);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = userCredential.user;

            console.log("🔹 Logged in user:", loggedUser.email);

            // Fetch user role from MongoDB
            const response = await fetch(`/api/users?email=${loggedUser.email}`);
            const userData = await response.json();

            if (userData?.role) {
                console.log(`✅ Role after login: ${userData.role}`);
                setUser(loggedUser);
                setRole(userData.role);
                const redirectTo = userData.role === "admin" ? "/admin" : userData.role === "subadmin" ? "/subadmin" : "/user";
                router.push(redirectTo);
            } else {
                console.log("❌ Role not found in MongoDB.");
                setErrorMessage("Role not found. Please contact support.");
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            setErrorMessage(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const googleUser = result.user;

            console.log("🔹 Google login user:", googleUser.email);

            // Fetch user role from MongoDB
            const response = await fetch(`/api/users?email=${googleUser.email}`);
            const userData = await response.json();

            if (userData?.role) {
                console.log(`✅ Role after Google login: ${userData.role}`);
                setUser(googleUser);
                setRole(userData.role);
                const redirectTo = userData.role === "admin" ? "/admin" : userData.role === "subadmin" ? "/subadmin" : "/user";
                router.push(redirectTo);
            } else {
                console.log("❌ Google user not registered.");
                setErrorMessage("Google login is only available for registered users.");
            }
        } catch (error) {
            console.error("❌ Google Login Error:", error);
            setErrorMessage(error.message);
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
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded text-lg mt-4 transition duration-300"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
}
