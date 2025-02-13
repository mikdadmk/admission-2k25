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
