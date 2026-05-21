import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const keyId = process.env.RAZORPAY_KEY_ID;
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

    return NextResponse.json(order);
}