import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma-db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: NextRequest) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_ID;

    // ======distance calculation function======
    const findddistance = async (pincode1: string, pincode2: string): Promise<number> => {
        // Implement your logic to find the distance between two pincodes
        // For demonstration, let's return a dummy value
        const publicurl = process.env.PUBLIC_BASE_URL;
        const res1 = await fetch(`${publicurl}/api/findcoordinates`, {
            method: "POST",
            body: JSON.stringify({ pincode: pincode1 }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("res1 in distance calculator", res1);
        if (!res1) {
            return 0;
        }
        const res2 = await fetch(`${publicurl}/api/findcoordinates`, {
            method: "POST",
            body: JSON.stringify({ pincode: pincode2 }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("res2 in distance calculator", res2);
        if (!res2) {
            return 0;
        }
        const data1 = await res1.json();
        const data2 = await res2.json();

        const lat1 = data1.lat;
        const lng1 = data1.lng;
        const lat2 = data2.lat;
        const lng2 = data2.lng;

        const R = 6371; // Earth radius in km

        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lng2 - lng1) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;

    }

    if (!keyId || !keySecret) {
        return NextResponse.json(
            { message: "Razorpay credentials are not configured." },
            { status: 500 }
        );
    }
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dbuser = await prisma.user.findUnique({
        where: {
            kindeId: user.id
        },
    })

    if (!dbuser) {
        return NextResponse.json({ message: "User not found in database" }, { status: 404 });
    }


    console.log("Before the creation of order the data to make order in db", req);

    let { pickupOption, billingPincode, amount } = await req.json();
    const distanceinkm = await findddistance(billingPincode, "396360");


    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });

    
    let couriersoption;
    if (pickupOption === "home" && distanceinkm > 20) {
        amount += 100 * 100;
        couriersoption = "HOME";
    }
    if(pickupOption === "Warehouse"){
        couriersoption = "WAREHOUSE";
    }
    if(distanceinkm <= 20 && pickupOption === "home"){
        couriersoption = "PAYALFABRICS";
    }


    const order = await razorpay.orders.create({
        amount,
        currency: "INR",
    });

    console.log("Created Razorpay order:", order);

    const firstcreationoforder = await prisma.order.create({
        data: {
            totalAmount: amount / 100,
            razorpayOrderId: order.id,
            userId: dbuser.id,
            orderedBy: user.given_name || "Unknown User",
            pickOption: couriersoption,
        },
    })
    if (!firstcreationoforder) {
        return NextResponse.json({ message: "Error creating order" }, { status: 500 });
    }

    return NextResponse.json({order, couriersoption});
}