// admission-management/src/app/subadmin/page.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SubAdminPage() {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // Wait until loading completes

        if (!user || role !== "subadmin") {
            router.push("/login");
        }
    }, [user, role, loading]);

    if (loading || !user || role !== "subadmin") {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome Sub-Admin</h1>
        </div>
    );
}
