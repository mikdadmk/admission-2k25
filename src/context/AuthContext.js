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
