// admission-management/src/app/admin/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "admin") {
            router.push("/login");
        }
    }, [user, role]);

    return (
        <div>
            <h1>Welcome Admin</h1>
    
        </div>
    );
}
