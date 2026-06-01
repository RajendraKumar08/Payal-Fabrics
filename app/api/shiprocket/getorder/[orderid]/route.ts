import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: Request) {
    const orderid = request.url.split("/").pop();
    if (!orderid) {
        return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }


    const cokeisStore = await cookies();
    let token = cokeisStore.get("shiprocket_token")?.value;

    if (!token) {
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
            token = data.token;

        } catch (error) {
            return NextResponse.json({ message: "Failed to authenticate with ShipRocket", error }, { status: 500 });
        }
    }

    try {
        const res = await fetch(`https://apiv2.shiprocket.in/v1/external/orders/show/${orderid}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const errorData = await res.json();
            return NextResponse.json({ message: "Failed to fetch order from Shiprocket", error: errorData }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json({ message: "Order fetched successfully from Shiprocket", data }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error fetching order from Shiprocket", error }, { status: 500 });
    }
}