import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_ID;

    if (!keyId || !keySecret) {
        return NextResponse.json(
            { message: "Razorpay credentials are not configured." },
            { status: 500 }
        );
    }

    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });

    const { amount } = await req.json();
    const order = await razorpay.orders.create({
        amount,
        currency: "INR",
    });

    console.log("Created Razorpay order:", order);

    return NextResponse.json(order);
}