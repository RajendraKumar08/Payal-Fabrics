import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { token, orderData } = body;

        const response = await fetch(`${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "ShipRocket order creation failed",
                    error: data,
                },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Order creation failed",
                error: error.response?.data || error.message,
            },
            { status: 500 }
        );
    }
}