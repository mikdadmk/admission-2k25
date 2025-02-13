"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RedirectBasedOnRole() {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // Wait until authentication is fully loaded

        if (!user) {
            router.replace("/login");
            return;
        }

        if (role) {
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            if (router.pathname !== redirectTo) {
                router.replace(redirectTo);
            }
        }
    }, [user, role, loading, router]);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return null;
}

export default function Layout({ children }) {
    return (
        <AuthProvider>
            <RedirectBasedOnRole />
            <html lang="en">
                <body>
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <main className="flex-1 p-4">{children}</main>
                    </div>
                </body>
            </html>
        </AuthProvider>
    );
}
