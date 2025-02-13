// admission-management/src/components/Sidebar.js
"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Sidebar() {
    const { role } = useAuth() || {};

    const sidebarLinks = {
        admin: [
            { name: "Profile", path: "/admin/profile" } // Admin profile page
        ],
        subadmin: [
            { name: "Profile", path: "/subadmin/profile" } // Subadmin profile page
        ],
        user: [
            { name: "Profile", path: "/user/profile" } // User profile page
        ]
    };

    return (
        <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
            <ul>
                {role && sidebarLinks[role]?.map((link) => (
                    <li key={link.path} className="mb-4">
                        <Link href={link.path} className="block p-2 hover:bg-gray-700 rounded">
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
