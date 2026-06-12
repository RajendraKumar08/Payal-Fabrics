
import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";

const generatesig  = async (paymentId: string, orderId: string) => {
    const keySecret = process.env.RAZORPAY_SECRET_ID;
    
    if (!keySecret) {
        console.error("RAZORPAY_SECRET_ID is not set in environment variables");
        throw new Error("Razorpay secret key not configured");
    }

    const crypto = await import("crypto");
    const toSign = orderId + "|" + paymentId;

    const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(toSign)
        .digest("hex");

    console.log("Signature generation:", { toSign, keySecret: keySecret.slice(0, 5) + "***", generatedSignature });

    return generatedSignature;
}
export async function POST(req: NextRequest) {
    try {
        console.log("=== Verification POST started ===");
        const { paymentId, orderId, signature } = await req.json();
        console.log("Received params:", { paymentId, orderId, signature });
        
        if (!paymentId || !orderId || !signature) {
            console.error("Missing parameters");
            return NextResponse.json({ message: "Missing required payment parameters" }, { status: 400 });
        }

        const generatedSignature = await generatesig(paymentId, orderId);

        console.log("Signature verification:", { 
            received: signature, 
            generated: generatedSignature, 
            match: generatedSignature === signature 
        });

        if (generatedSignature === signature)   {
            console.log("Signature match successful");
            const { getUser } = getKindeServerSession();
            const user = await getUser();
            console.log("Kinde user:", user?.id);
            
                if (!user || !user.id) {
                    console.error("No authenticated user");
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
            console.log("DB user found:", dbuser?.id);
            
            if (!dbuser) {
                console.error("User not found in database");
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
            
            const orderedBy = dbuser.name || "Unknown";
            console.log("Creating order with amount:", totalAmount);
        

            const order = await prisma.order.create({
                data: {
                    userId: dbuser.id,
                    totalAmount,
                    razorpayOrderId : orderId,
                    razorpayPaymentId: paymentId,
                    paymentStatus: "PAID",
                    orderedBy: orderedBy,

                }
            });
            console.log("Order created:", order.id);
            
            for (const item of dbuser.cartItems) {
                await prisma.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        productName: item.product.name,
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
            console.log("Order items and stock updated");

            await prisma.cartItem.deleteMany({
                where: {
                    userId: dbuser.id
                }
            });
            console.log("Cart cleared");

            console.log("=== Verification successful ===");
            return NextResponse.json({ message: "Payment verified successfully.", isOk: true });
        } else {
            console.error("Signature mismatch - verification failed");
            return NextResponse.json({ message: "Payment verification failed.", isOk: false }, { status: 400 });
        }
    } catch (error) {
        console.error("=== Verification error ===", error);
        const errorMsg = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ 
            message: `Server error: ${errorMsg}`, 
            isOk: false 
        }, { status: 500 });
    }
}