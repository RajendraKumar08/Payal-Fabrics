
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.nextUrl.searchParams.get("token");
        const pickup_postcode =
            req.nextUrl.searchParams.get("pickup_postcode");

        const delivery_postcode =
            req.nextUrl.searchParams.get("delivery_postcode");

        const weight = req.nextUrl.searchParams.get("weight");

        const response = await fetch(`${process.env.SHIPROCKET_API_URL}/courier/serviceability/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                pickup_postcode,
                delivery_postcode,
                weight,
                cod: 0,
                mode: "Surface",
            }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Rate check failed",
                error: error.response?.data || error.message,
            },
            { status: 500 }
        );
    }
}