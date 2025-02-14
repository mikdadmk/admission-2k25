// admission-management/src/app/admin/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || role !== "admin") {
                if (!redirecting) {
                    setRedirecting(true);
                    router.replace("/login"); 
                }
            }
        }
    }, [user, role, loading, router, redirecting]);

    if (loading || redirecting) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">Welcome Admin</h1>
            <p className="mt-4">This is the admin dashboard.</p>
        </div>
    );
}
