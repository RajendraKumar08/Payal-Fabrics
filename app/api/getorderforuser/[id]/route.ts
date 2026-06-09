import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

export async function GET(request: NextRequest) {
    const orderId = request.nextUrl.pathname.split('/').pop();

    const res = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    return NextResponse.json(res);
}
