import { NextResponse, NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";

export async function GET(request: NextRequest){
    const { getUser } = getKindeServerSession();
    const orderId = request.nextUrl.pathname.split("/").pop();
    const response = await prisma.orderItem.findMany({
        where: {
            orderId: orderId as string
        }
    })
    return NextResponse.json(response);
}