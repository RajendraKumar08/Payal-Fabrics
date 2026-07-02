import {prisma} from "@/prisma-db";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(request: Request) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const dbuser = await prisma.user.findUnique({
        where: {kindeId: user.id},
    });

    if(!dbuser){
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    const {searchParams} = new URL(request.url);
    const productId = searchParams.get("productId");
    if(!productId){
        return NextResponse.json({message: "Product ID is required"}, {status: 400});
    }
    const cartItems = await prisma.cartItem.findMany({
        where: {
            userId: dbuser.id,
            productId,
        },
    });

    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    return NextResponse.json({quantity});
}