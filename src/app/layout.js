// admission-management/src/app/layout.js
"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "@/styles/globals.css";

function RedirectBasedOnRole() {
    const { user, role, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/login");
            return;
        }

        if (role && !isRedirecting) {
            setIsRedirecting(true);
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            if (pathname !== redirectTo) {
                router.replace(redirectTo);
            }
        }
    }, [user, role, loading, pathname, isRedirecting]);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return null;
}

export default function Layout({ children }) {
    return (
        <AuthProvider>
            <html lang="en">
                <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
                    <Navbar />
                    <AuthWrapper>{children}</AuthWrapper>
                </body>
            </html>
        </AuthProvider>
    );
}

function AuthWrapper({ children }) {
    const { role } = useAuth();
    const pathname = usePathname();
    const hideSidebarRoutes = ["/login", "/register"];
    const showSidebar = role === "admin" || role === "subadmin" || role === "user";

    return (
        <div className="flex flex-1">
            {showSidebar && !hideSidebarRoutes.includes(pathname) && <Sidebar />}
            <main className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4">{children}</main>
        </div>
    );
}
