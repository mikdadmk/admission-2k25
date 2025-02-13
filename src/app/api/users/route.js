// admission-management/src/app/api/users/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    const client = await clientPromise;
    const db = client.db('admission_management');
    const users = await db.collection('users').find({}).toArray();
    return NextResponse.json(users);
}