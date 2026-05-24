// import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
    console.log("url", process.env.SHIPROCKET_API_URL);
    console.log("email", process.env.SHIPROCKET_API_EMAIL);
    console.log("password", process.env.SHIPROCKET_API_PASSWORD);
    try {
        const response = await fetch(`${process.env.SHIPROCKET_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: process.env.SHIPROCKET_API_EMAIL,
                password: process.env.SHIPROCKET_API_PASSWORD,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "ShipRocket authentication failed",
                    error: data,
                },
                { status: response.status }
            );
        }

        if (!data?.token) {
            return NextResponse.json(
                {
                    message: "ShipRocket authentication returned no token",
                    error: data,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            token: data.token,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Authentication failed",
                error: error.response?.data || error.message,
            },
            { status: 500 }
        );
    }
}