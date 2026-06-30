import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import {prisma} from "@/prisma-db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: NextRequest) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_ID;

    if (!keyId || !keySecret) {
        return NextResponse.json(
            { message: "Razorpay credentials are not configured." },
            { status: 500 }
        );
    }
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const dbuser = await prisma.user.findUnique({
        where: {
            kindeId: user.id
        },
    })

    if(!dbuser){
        return NextResponse.json({message: "User not found in database"}, {status: 404});
    }


    console.log("Before the creation of order the data to make order in db", req);
    

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

    const firstcreationoforder = await prisma.order.create({
        data: {
            totalAmount: amount/100,
            razorpayOrderId: order.id,
            userId: dbuser.id,
            orderedBy: user.given_name || "Unknown User",
        },
    })
    if(!firstcreationoforder){
        return NextResponse.json({message: "Error creating order"}, {status: 500});
    }

    return NextResponse.json(order);
}