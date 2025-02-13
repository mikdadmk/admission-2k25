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