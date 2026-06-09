import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma-db";

export async function POST(request: NextRequest) {
    const orderId = request.nextUrl.pathname.split('/').pop();

    if (!orderId) {
        return NextResponse.json({ error: 'Missing orderId in request path.' }, { status: 400 });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: 'SHIPPED',
            },
        });

        return NextResponse.json({
            success: true,
            message: `Order ${orderId} marked as shipped.`,
            order: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to mark order as shipped.' }, { status: 500 });
    }
}

