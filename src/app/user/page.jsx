"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserPage() {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (loading) return;

        if (!user || role !== "user") {
            if (!isRedirecting) {
                setIsRedirecting(true);
                router.replace("/login");
            }
            return;
        }
    }, [user, role, loading, router, isRedirecting]);

    if (loading || isRedirecting) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return <div>Welcome User</div>;
}
