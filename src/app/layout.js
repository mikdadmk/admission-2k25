"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "@/styles/globals.css";

function RedirectBasedOnRole() {
    const { user, role, loading } = useAuth() || {};
    const [isRedirecting, setIsRedirecting] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;
        if (!user) return;

        if (role && !isRedirecting) {
            setIsRedirecting(true);
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            if (pathname !== redirectTo) {
                window.location.replace(redirectTo);
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
    const { role, loading } = useAuth() || {};
    const pathname = usePathname();
    const hideSidebarRoutes = ["/", "/login", "/register"];

    // Wait until role is loaded
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const showSidebar = role === "admin" || role === "subadmin" || role === "user";

    return (
        <div className="flex">
            {/* Sidebar (Only shown on respective pages) */}
            {showSidebar && !hideSidebarRoutes.includes(pathname) && <Sidebar />}
            {/* Main content with full width when sidebar is hidden */}
            <main className="flex-1 p-6 bg-white shadow-lg rounded-lg m-4">{children}</main>
        </div>
    );
}
