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