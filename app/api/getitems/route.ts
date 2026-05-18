import { NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
