// admission-management/src/app/user/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserPage() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "user") {
            router.push("/login");
        }
    }, [user, role]);

    return (
        <div>
            <h1>Welcome User</h1>
        </div>
    );
}
