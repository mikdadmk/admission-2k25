this is folder structure 
admission-management/
│── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── route.js            # Firebase Authentication (Login, Register)
│   │   │   ├── users/
│   │   │   │   ├── route.js            # Fetch user data
│   │   │   ├── register/ 
│   │   │   │   ├── route.js  
│   │   │   ├── admin/
│   │   │   │   ├── route.js            # Admin-specific APIs
│   │   │   ├── subadmin/
│   │   │   │   ├── route.js            # Subadmin-specific APIs
│   │   │   ├── admissions/
│   │   │   │   ├── route.js            # CRUD for Admission Data
│   │   ├── admin/
│   │   │   ├── page.js                 # Admin Dashboard Page
│   │   ├── subadmin/
│   │   │   ├── page.js                 # Subadmin Dashboard Page
│   │   ├── user/
│   │   │   ├── page.js                 # User Dashboard Page
│   │   ├── login/
│   │   │   ├── page.js                 # Login Page
│   │   ├── register/
│   │   │   ├── page.js                 # Register Page
│   │   ├── layout.js                    # Layout Component
│   │   ├── page.js                      # Home Page
│   ├── components/
│   │   ├── Navbar.js                    # Top Navigation Bar
│   │   ├── Sidebar.js                   # Sidebar Navigation
│   │   ├── AdminDashboard.js            # Admin Panel UI
│   │   ├── SubadminDashboard.js         # Subadmin Panel UI
│   │   ├── UserDashboard.js             # User Panel UI
│   ├── context/
│   │   ├── AuthContext.js                # Firebase Authentication Context
│   ├── lib/
│   │   ├── mongodb.js                    # MongoDB Connection Setup
│   ├── middleware/
│   │   ├── authMiddleware.js             # Middleware for Role-based Access
│   ├── styles/
│   │   ├── globals.css                   # Global Styles
│   ├── utils/
│   │   ├── helpers.js                     # Helper Functions
│── .env.local                              # Environment Variables
│── next.config.js                          # Next.js Config
│── package.json                            # Dependencies & Scripts
│── README.md                               # Project Documentation




this is folder structure 
admission-management/
│── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── route.js            # Firebase Authentication (Login, Register)
│   │   │   ├── users/
│   │   │   │   ├── route.js            # Fetch user data
│   │   │   ├── register/ 
│   │   │   │   ├── route.js  
│   │   │   ├── admin/
│   │   │   │   ├── route.js            # Admin-specific APIs
│   │   │   ├── subadmin/
│   │   │   │   ├── route.js            # Subadmin-specific APIs
│   │   │   ├── admissions/
│   │   │   │   ├── route.js            # CRUD for Admission Data
│   │   ├── admin/
│   │   │   ├── page.js                 # Admin Dashboard Page
│   │   ├── subadmin/
│   │   │   ├── page.js                 # Subadmin Dashboard Page
│   │   ├── user/
│   │   │   ├── page.js                 # User Dashboard Page
│   │   ├── login/
│   │   │   ├── page.js                 # Login Page
│   │   ├── register/
│   │   │   ├── page.js                 # Register Page
│   │   ├── layout.js                    # Layout Component
│   │   ├── page.js                      # Home Page
│   ├── components/
│   │   ├── Navbar.js                    # Top Navigation Bar
│   │   ├── Sidebar.js                   # Sidebar Navigation
│   │   ├── AdminDashboard.js            # Admin Panel UI
│   │   ├── SubadminDashboard.js         # Subadmin Panel UI
│   │   ├── UserDashboard.js             # User Panel UI
│   ├── context/
│   │   ├── AuthContext.js                # Firebase Authentication Context
│   ├── lib/
│   │   ├── mongodb.js                    # MongoDB Connection Setup
│   ├── middleware/
│   │   ├── authMiddleware.js             # Middleware for Role-based Access
│   ├── styles/
│   │   ├── globals.css                   # Global Styles
│   ├── utils/
│   │   ├── helpers.js                     # Helper Functions
│── .env.local                              # Environment Variables
│── next.config.js                          # Next.js Config
│── package.json                            # Dependencies & Scripts
│── README.md                               # Project Documentation



src->app->page.jsx
// admission-management/src/app/page.js
"use client"
export default function HomePage() {
  return (
      <div>
          <h1>Welcome to Admission Management System</h1>
          <p>Select your role and proceed to the respective dashboard.</p>
      </div>
  );
}

app->layout.js
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

app->admin->page.jsx
// admission-management/src/app/admin/page.js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
    const { user, role } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!user || role !== 'admin') {
            router.push('/login');
        }
    }, [user, role]);
    
    return <div>Welcome Admin</div>;
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

app->api->register->route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    try {
        const { uid, email } = await req.json();
        const client = await clientPromise;
        const db = client.db("admission_management");

        // Check if an admin exists
        const adminExists = await db.collection("users").findOne({ role: "admin" });
        const role = adminExists ? "user" : "admin";

        // Store user in MongoDB
        await db.collection("users").insertOne({ uid, email, role });

        return NextResponse.json({ message: "User registered successfully", role }, { status: 200 });
    } catch (error) {
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
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    const client = await clientPromise;
    const db = client.db('admission_management');
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json(users);
}

app->login->page.jsx

// admission-management/src/app/login/page.js
"use client"
import { useState } from 'react';
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            if (error.message.includes('already in use')) {
                alert('Please log in with Google, you are registered with Google.');
            } else {
                alert(error.message);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}


app->register->page.jsx
"use client";

import { useState } from "react";
import { auth, googleProvider, createUserWithEmailAndPassword, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User registered:", user.uid);

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, email: user.email }),
            });

            router.push("/login");
        } catch (error) {
            console.error("Registration error:", error);
            alert(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            console.log("Google Sign-up:", user.uid);

            // Call API to store user in MongoDB
            await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: user.uid, email: user.email }),
            });

            router.push("/");
        } catch (error) {
            console.error("Google Sign-up error:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
        </div>
    );
}


app->subadmin->page.jsx
// admission-management/src/app/subadmin/page.js
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SubAdminPage() {
    const { user, role } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!user || role !== 'subadmin') {
            router.push('/login');
        }
    }, [user, role]);
    
    return <div>Welcome Sub-Admin</div>;
}

app->user-page.jsx
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


src->components->AdminDashboard.js
// admission-management/src/components/AdminDashboard.js
export default function AdminDashboard() {
    return <div>Admin Dashboard - Manage admissions and users</div>;
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
export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white p-4">
            <ul>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/subadmin">Subadmin</a></li>
                <li><a href="/user">User</a></li>
            </ul>
        </aside>
    );
}

src->components->SubadminDashboard.js
// admission-management/src/components/SubadminDashboard.js
export default function SubadminDashboard() {
    return <div>Subadmin Dashboard - Limited control</div>;
}


src->components->UserDashboard.js

// admission-management/src/components/UserDashboard.js
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
                    // Fetch role from MongoDB API
                    const res = await fetch(`/api/users?uid=${authUser.uid}`);
                    const data = await res.json();

                    if (data.role) {
                        setUser(authUser);
                        setRole(data.role);
                    } else {
                        setUser(null);
                        setRole(null);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUser(null);
                    setRole(null);
                }
            } else {
                setUser(null);
                setRole(null);
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
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("authToken");

    if (!token && ["/login", "/register"].includes(pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const { payload } = await jwtVerify(token, secretKey);
        const userRole = payload.role;

        if (!userRole) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (pathname.startsWith("/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (pathname.startsWith("/subadmin") && userRole !== "subadmin") {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (pathname.startsWith("/user") && userRole !== "user") {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("JWT Verification Failed:", error);
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

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}


src->utils->helpers.js
this file is empty 