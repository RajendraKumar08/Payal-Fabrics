
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const generatesig  = async (paymentId: string, orderId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET_ID;
    const crypto = await import("crypto");

    const generatedSignature = crypto
        .createHmac("sha256", keySecret || "")
        .update(orderId + "|" + paymentId)
        .digest("hex");

    return generatedSignature;

}
export async function POST(req: NextRequest) {
    const { paymentId, orderId, signature } = await req.json();
    const generatedSignature = await generatesig(paymentId, orderId);

    if (generatedSignature === signature)   {
        return NextResponse.json({ message: "Payment verified successfully.", isOk: true });
    } else {
        return NextResponse.json({ message: "Payment verification failed.", isOk: false }, { status: 400 });
    }
}