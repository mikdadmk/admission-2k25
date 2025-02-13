"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (loading) return;

        if (user && role) {
            if (!isRedirecting) {
                setIsRedirecting(true);
                const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
                router.replace(redirectTo);
            }
        }
    }, [user, role, loading, router, isRedirecting]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold">Welcome to Admission Management System</h1>
            <p className="text-lg mt-4">Please login or register to continue.</p>
        </div>
    );
}
