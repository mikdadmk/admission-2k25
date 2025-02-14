// admission-management/src/app/page.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <motion.h1 
                className="text-5xl font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to Admission Management System
            </motion.h1>
            <motion.p 
                className="text-lg mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Please register or login to continue.
            </motion.p>
            <motion.div 
                className="mt-6 flex space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <button 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
                    onClick={() => router.push("/register")}
                >
                    Register
                </button>
                <button 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
                    onClick={() => router.push("/login")}
                >
                    Login
                </button>
            </motion.div>
        </div>
    );
}
