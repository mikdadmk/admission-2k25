"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
    const { role, loading } = useAuth() || {};
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Ensure sidebar is only visible when role is fetched
    useEffect(() => {
        if (!loading && role) {
            setIsVisible(true);
        }
    }, [loading, role]);

    // Close sidebar when clicking outside on small screens
    useEffect(() => {
        if (isOpen) {
            const handleOutsideClick = (event) => {
                if (!document.getElementById("sidebar").contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [isOpen]);

    // Sidebar Links Configuration
    const sidebarLinks = {
        admin: [
            {
                section: "Home",
                links: [
                    { name: "Dashboard", path: "/admin" },
                    { name: "Users/Others", path: "/admin/users" }
                ]
            },
            {
                section: "Institute",
                links: [{ name: "Institutes", path: "/admin/institutes" }]
            },
            {
                section: "Student",
                links: [
                    { name: "Applications", path: "/admin/applications" },
                    { name: "Students", path: "/admin/students" },
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
                links: [{ name: "Profile", path: "/admin/profile" }]
            }
        ],
        subadmin: [
            {
                section: "Profile",
                links: [{ name: "Profile", path: "/subadmin/profile" }]
            }
        ],
        user: [
            {
                section: "Profile",
                links: [{ name: "Profile", path: "/user/profile" }]
            }
        ]
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-3 fixed top-4 left-4 bg-gray-800 text-white rounded-lg z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Sidebar - Visible on Desktop & Toggle on Mobile */}
            <AnimatePresence>
                {isVisible && role && (
                    <motion.aside
                        id="sidebar"
                        className={`w-64 bg-gray-900 text-white p-4 min-h-screen fixed top-0 left-0 md:relative md:translate-x-0 z-40 ${
                            isOpen ? "translate-x-0" : "-translate-x-full"
                        } md:block transition-transform duration-300 ease-in-out`}
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                    >
                        {/* Close Button for Mobile */}
                        <button
                            className="md:hidden text-white absolute top-4 right-4"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>

                        <ul>
                            {sidebarLinks[role]?.map((section) => (
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
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
