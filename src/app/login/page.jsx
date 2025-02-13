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
