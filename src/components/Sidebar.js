// admission-management/src/components/Sidebar.js
"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Sidebar() {
    const { role } = useAuth() || {};

    const sidebarLinks = {
        admin: [
            {
                section: "Home",
                links: [
                    { name: "Dashboard", path: "/admin/dashboard" },
                    { name: "Users/Others", path: "/admin/users" }
                ]
            },
            {
                section: "Institute",
                links: [
                    { name: "Institutes", path: "/admin/institutes" }
                ]
            },
            {
                section: "Student",
                links: [
                    { name: "Applications", path: "/admin/applications" },
                    { name: "Student", path: "/admin/students" },
                    { name: "Admit Card", path: "/admin/admitcard" }
                ]
            },
            {
                section: "Notify Student",
                links: [
                    { name: "Notify Students", path: "/admin/notify-students" },
                    { name: "Notification Template", path: "/admin/notification-template" }
                ]
            },
            {
                section: "Profile",
                links: [
                    { name: "Profile", path: "/admin/profile" }
                ]
            }
        ],
        subadmin: [
            {
                section: "Profile",
                links: [
                    { name: "Profile", path: "/subadmin/profile" }
                ]
            }
        ],
        user: [
            {
                section: "Profile",
                links: [
                    { name: "Profile", path: "/user/profile" }
                ]
            }
        ]
    };

    return (
        <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen">
            <ul>
                {role && sidebarLinks[role]?.map((section) => (
                    <li key={section.section} className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">{section.section}</h2>
                        <ul>
                            {section.links.map((link) => (
                                <li key={link.path} className="mb-2">
                                    <Link href={link.path} className="block p-2 hover:bg-gray-700 rounded">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
