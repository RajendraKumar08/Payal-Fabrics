import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

export async function GET(req: NextRequest) {

    try {

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { product },
            { status: 200 }
        );

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
