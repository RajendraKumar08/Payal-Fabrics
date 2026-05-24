
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { token, shipment_id } = body;

        const response = await fetch(`${process.env.SHIPROCKET_API_URL}/courier/assign/awb`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ shipment_id }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "AWB assignment failed",
                error: error.response?.data || error.message,
            },
            { status: 500 }
        );
    }
}