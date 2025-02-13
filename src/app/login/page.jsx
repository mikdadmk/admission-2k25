// admission-management/src/app/login/page.js
"use client";
import { useState } from "react";
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-blue-500" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-blue-500" />
                <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-lg transition duration-300">Login</button>
                <button onClick={handleGoogleLogin} className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded text-lg mt-4 transition duration-300">Login with Google</button>
            </div>
        </div>
    );
}
