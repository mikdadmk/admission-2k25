

this is folder structure 
admission-management/
│── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── route.js           
│   │   │   ├── users/
│   │   │   │   ├── route.js            
│   │   │   ├── admin/
│   │   │   │   ├── route.js 
│   │   │   ├── register/
│   │   │   │   ├── route.js 
│   │   │   ├── subadmin/
│   │   │   │   ├── route.js         
│   │   │   ├── admissions/
│   │   │   │   ├── route.js           
│   │   ├── admin/
│   │   │   ├── page.jsx 
|   |   |   ├── profile/ 
│   │   │   │   ├── page.jsx
|   |   |   ├── users/ 
│   │   │   │   ├── page.jsx        
│   │   ├── subadmin/
│   │   │   ├── page.jsx
|   |   |   ├── profile/ 
│   │   │   │   ├── page.jsx                
│   │   ├── user/
│   │   │   ├── page.jsx
|   |   |   ├── profile/ 
│   │   │   │   ├── page.jsx                  
│   │   ├── login/
│   │   │   ├── page.jsx                
│   │   ├── register/
│   │   │   ├── page.jsx                
│   │   ├── layout.js                    
│   │   ├── page.jsx                    
│   ├── components/
│   │   ├── Navbar.js                   
│   │   ├── LogoutButton.js              
│   │   ├── Sidebar.js                  
│   │   ├── AdminDashboard.js           
│   │   ├── SubadminDashboard.js         
│   │   ├── UserDashboard.js            
│   ├── context/
│   │   ├── AuthContext.js               
│   ├── lib/
│   │   ├── mongodb.js    
│   │   ├── firebase.js                  
│   ├── middleware/
│   │   ├── authMiddleware.js            
│   ├── styles/
│   │   ├── globals.css                  
│   ├── utils/
│   │   ├── helpers.js                     
│── .env.local                             
│── next.config.js                        
│── package.json                           
│── README.md                              



src->app->page.jsx
// admission-management/src/app/page.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <motion.h1 
                className="text-5xl font-bold"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to Admission Management System
            </motion.h1>
            <motion.p 
                className="text-lg mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Please register or login to continue.
            </motion.p>
            <motion.div 
                className="mt-6 flex space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <button 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
                    onClick={() => router.push("/register")}
                >
                    Register
                </button>
                <button 
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-gray-200 transition duration-300"
                    onClick={() => router.push("/login")}
                >
                    Login
                </button>
            </motion.div>
        </div>
    );
}



app->layout.js
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

        if (!user) {
            return;
        }

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
    const { role } = useAuth() || {};
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


app->admin->page.jsx
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


app->admin->profile->page.jsx

// admission-management/src/app/admin/profile/page.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "@/components/LogoutButton";

export default function AdminProfile() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "admin") {
            router.push("/login");
        }
    }, [user, role]);

    if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">Admin Profile</h1>
            <p className="mt-4">Email: {user.email}</p>
            <LogoutButton />
        </div>
    );
}



app->admin->users->page.jsx

// admission-management/src/app/admin/users/page.js
"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Registered Users</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">User Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Contact</th>
                        <th className="border border-gray-300 p-2">Institute</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id} className="text-center">
                                <td className="border border-gray-300 p-2">{user.userName}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.contact}</td>
                                <td className="border border-gray-300 p-2">{user.institute}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}



app->api->admin->route.js
// admission-management/src/app/api/admin/route.js
export async function GET() {
    return NextResponse.json({ message: 'Admin-specific data' });
}

app->api->admissions->route.js
// admission-management/src/app/api/admissions/route.js
export async function GET() {
    return NextResponse.json({ message: 'Admissions data' });
}


app->api->auth->route.js

// admission-management/src/app/api/auth/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';

export async function POST(req) {
    const { email, password } = await req.json();
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return NextResponse.json({ user: userCredential.user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

app->api->register->route.js
// admission-management/src/app/api/register/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { uid, userName, email, contact, institute } = await req.json();
        const client = await clientPromise;
        const db = client.db("admission_management");

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ email });
        let role = "user"; // Default role is user

        if (!existingUser) {
            const adminExists = await db.collection("users").findOne({ role: "admin" });
            const subadminExists = await db.collection("users").findOne({ role: "subadmin" });

            if (!adminExists) {
                role = "admin"; // First user becomes admin
            } else if (!subadminExists) {
                role = "subadmin"; // Second unique user becomes subadmin
            }
        } else {
            role = existingUser.role; // Ensure role remains unchanged if user exists
        }

        // Store or update user in MongoDB with the correct role
        await db.collection("users").updateOne(
            { email },
            { $set: { uid, userName, email, contact, institute, role } },
            { upsert: true }
        );

        return NextResponse.json({ message: "User registered successfully", role }, { status: 200 });
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



app->api->subadmin->route.js 

// admission-management/src/app/api/subadmin/route.js
export async function GET() {
    return NextResponse.json({ message: 'Subadmin-specific data' });
}

app->api->users->route.js 
// admission-management/src/app/api/users/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("admission_management");
        const users = await db.collection("users").find({}).toArray();

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

app->login->page.jsx

// admission-management/src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { user, role } = useAuth();

    useEffect(() => {
        if (user && role) {
            const redirectTo = role === "admin" ? "/admin" : role === "subadmin" ? "/subadmin" : "/user";
            router.push(redirectTo);
        }
    }, [user, role, router]);

    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const handleLogin = async () => {
        if (!email || !validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setErrorMessage("Please enter your password.");
            return;
        }
        setErrorMessage("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role from database
            const response = await fetch(`/api/users?uid=${user.uid}`);
            const userData = await response.json();

            if (userData && userData.length > 0 && userData[0].role) {
                const redirectTo = userData[0].role === "admin" ? "/admin" : userData[0].role === "subadmin" ? "/subadmin" : "/user";
                router.push(redirectTo);
            } else {
                setErrorMessage("Role not found. Please contact support.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Fetch user role from database
            const response = await fetch(`/api/users?uid=${user.uid}`);
            const userData = await response.json();

            if (userData && userData.length > 0 && userData[0].role) {
                const redirectTo = userData[0].role === "admin" ? "/admin" : userData[0].role === "subadmin" ? "/subadmin" : "/user";
                router.push(redirectTo);
            } else {
                setErrorMessage("Role not found. Please contact support.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" 
                />
                <button 
                    onClick={handleLogin} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg transition duration-300"
                >
                    Login
                </button>
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded text-lg mt-4 transition duration-300"
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
}

app->register->page.jsx
// admission-management/src/app/register/page.js
"use client";

import { useState } from "react";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [institute, setInstitute] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, userName, email, contact, institute }),
            });

            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, userName: user.displayName, email: user.email, contact: "", institute: "" }),
            });

            router.push("/");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                <input type="text" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <select onChange={(e) => setInstitute(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500">
                    <option value="">Select Institute</option>
                    <option value="Islamic Da'wa Academy">Islamic Da'wa Academy</option>
                    <option value="Daiya Islamic Academy for Women">Daiya Islamic Academy for Women</option>
                    <option value="Hifzul Quran College">Hifzul Quran College</option>
                </select>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded focus:ring-2 focus:ring-green-500" />
                <button onClick={handleRegister} className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded text-lg transition duration-300">Register</button>
                <button onClick={handleGoogleSignUp} className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded text-lg mt-4 transition duration-300">Sign Up with Google</button>
            </div>
        </div>
    );
}

app->subadmin->page.jsx
// admission-management/src/app/subadmin/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SubAdminPage() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "subadmin") {
            router.push("/login");
        }
    }, [user, role]);

    return (
        <div>
            <h1>Welcome Sub-Admin</h1>
        </div>
    );
}


app->subadmin->profile->page.jsx

// admission-management/src/app/subadmin/profile/page.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "@/components/LogoutButton";

export default function SubAdminProfile() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "subadmin") {
            router.push("/login");
        }
    }, [user, role]);

    if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">Subadmin Profile</h1>
            <p className="mt-4">Email: {user.email}</p>
            <LogoutButton />
        </div>
    );
}


app->user-page.jsx
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

src->app->user->profile->page.jsx

// admission-management/src/app/user/profile/page.js
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "@/components/LogoutButton";

export default function UserProfile() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || role !== "user") {
            router.push("/login");
        }
    }, [user, role]);

    if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="mt-4">Email: {user.email}</p>
            <LogoutButton />
        </div>
    );
}



src->components->AdminDashboard.js
// admission-management/src/components/AdminDashboard.js
export default function AdminDashboard() {
    return <div>Admin Dashboard - Manage admissions and users</div>;
}


src->components->LogoutButton.js
// admission-management/src/components/LogoutButton.js
"use client";

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear session cookie
            router.push("/login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
}


src->components->Navbar.js
// admission-management/src/components/Navbar.js
export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">Admission Management System</nav>
    );
}

src->components->Sidebar.js

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


src->components->SubadminDashboard.js
export default function SubadminDashboard() {
    return <div>Subadmin Dashboard - Limited control</div>;
}



src->components->UserDashboard.js

export default function UserDashboard() {
    return <div>User Dashboard - View admission status</div>;
}
src->context->AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                try {
                    // Fetch user role from MongoDB
                    const res = await fetch(`/api/users?uid=${authUser.uid}`);
                    const data = await res.json();

                    if (data.role) {
                        setUser(authUser);
                        setRole(data.role);
                        document.cookie = `authToken=${authUser.uid}; path=/`; // Set Firebase session
                    } else {
                        setUser(authUser);
                        setRole("user");
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUser(null);
                    setRole(null);
                }
            } else {
                setUser(null);
                setRole(null);
                document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear session
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}


src->lib->firebase.js

// admission-management/src/lib/firebase.js
// admission-management/src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, doc, setDoc, getDoc };

src->lib->mongodb.js
// admission-management/src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;




src->middleware->authMiddleware.js
// admission-management/src/middleware/authMiddleware.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const authToken = req.cookies.get("authToken"); // Firebase session cookie

    if (!authToken && ["/login", "/register"].includes(pathname)) {
        return NextResponse.next();
    }

    if (!authToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const client = await clientPromise;
        const db = client.db("admission_management");

        // Fetch user by Firebase UID
        const user = await db.collection("users").findOne({ uid: authToken });

        if (!user) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // Role-based access control
        if (pathname.startsWith("/admin") && user.role !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (pathname.startsWith("/subadmin") && user.role !== "subadmin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (pathname.startsWith("/user") && user.role !== "user") {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware Error:", error);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/subadmin/:path*", "/user/:path*"],
};


src->styles->globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    color: #171717;
    background: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
}


src->utils->helpers.js
this file is empty 