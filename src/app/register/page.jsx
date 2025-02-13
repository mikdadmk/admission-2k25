// admission-management/src/app/register/page.js
"use client";

import { useState } from "react";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [institute, setInstitute] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, userName, email, contact, institute }),
            });

            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, userName: user.displayName, email: user.email, contact: "", institute: "" }),
            });

            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <input type="text" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <select onChange={(e) => setInstitute(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500">
                    <option value="">Select Institute</option>
                    <option value="Islamic Da'wa Academy">Islamic Da'wa Academy</option>
                    <option value="Daiya Islamic Academy for Women">Daiya Islamic Academy for Women</option>
                    <option value="Hifzul Quran College">Hifzul Quran College</option>
                </select>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <button onClick={handleRegister} className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg transition duration-300">Register</button>
                <button onClick={handleGoogleSignUp} className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded text-lg mt-4 transition duration-300">Sign Up with Google</button>
            </div>
        </div>
    );
}