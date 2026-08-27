import Razorpay from "razorpay";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma-db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req: NextRequest) {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_SECRET_ID;

    // ======distance calculation helper======
    const getCoordinates = async (pincode: string) => {
        if (!process.env.OPENCAGE_API_KEY) {
            throw new Error("OpenCage API key is not configured.");
        }

        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(`${pincode}, India`)}&key=${process.env.OPENCAGE_API_KEY}&limit=1`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch coordinates.");
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error("No coordinates found for the provided pincode.");
        }

        return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng,
        };
    };

    const findddistance = async (pincode1: string, pincode2: string): Promise<number> => {
        const from = await getCoordinates(pincode1);
        const to = await getCoordinates(pincode2);

        const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const R = 6371;
        const dLat = toRadians(to.lat - from.lat);
        const dLon = toRadians(to.lng - from.lng);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(from.lat)) *
            Math.cos(toRadians(to.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

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
    console.log("Distance in km between billing pincode and warehouse pincode:", distanceinkm);


    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });


    let couriersoption: string;
    if (pickupOption === "home" && distanceinkm > 20) {
        amount += 100 * 100;
        couriersoption = "HOME";
    } else if (pickupOption === "warehouse") {
        couriersoption = "WAREHOUSE";
    } else if (pickupOption === "home" && distanceinkm <= 20) {
        couriersoption = "PAYALFABRICS";
    } else {
        return NextResponse.json(
            { message: "Invalid pickup option" },
            { status: 400 }
        );
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

    return NextResponse.json({ order, couriersoption });
}