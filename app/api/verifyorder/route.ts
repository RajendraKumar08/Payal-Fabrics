
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";

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
        const { getUser } = getKindeServerSession();
        const user = await getUser();
            if (!user || !user.id) {
                return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
            }
        const dbuser = await prisma.user.findUnique({
            where: {
                kindeId: user.id
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!dbuser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const totalAmount = dbuser.cartItems.reduce(
            (sum , item) => {
                return (
                    sum +
                    item.product.price * item.quantity
                );
            },
            0
        );
        const order = await prisma.order.create({
            data: {
                userId: dbuser.id,
                totalAmount,
                razorpayOrderId : orderId,
                razorpayPaymentId: paymentId,
                paymentStatus: "PAID",

            }
        });
        for (const item of dbuser.cartItems) {
            await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }
            });

            await prisma.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }

        await prisma.cartItem.deleteMany({
            where: {
                userId: dbuser.id
            }
        });

        return NextResponse.json({ message: "Payment verified successfully.", isOk: true });
    } else {
        return NextResponse.json({ message: "Payment verification failed.", isOk: false }, { status: 400 });
    }
}