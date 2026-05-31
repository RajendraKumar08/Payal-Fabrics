import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

const getorder = async (req: Request) => {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    const orderId = req.body ? (await req.json()).orderId : null;
    if(!orderId){
        return NextResponse.json({message: "Order ID is required"}, {status: 400});
    }
    try{
        const res = await prisma.order.findMany({
            where: {
                id: orderId,
            }
        })
        return NextResponse.json({message: "Order fetched successfully", data: res}, {status: 200});
    } catch(error){
        console.log("Error fetching order in admin", error);
        return NextResponse.json({message: "Error fetching order in admin", status: 500});
    }
}