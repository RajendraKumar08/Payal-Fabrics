import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

export async function PATCH(req: NextRequest) {

    try {

        const body = await req.json();

        const { id, name, price, description, category, stock } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const updated_product = await prisma.product.update({
            where: { id },
            data: {
                ...(name        && { name }),
                ...(price       && { price: Number(price) }),
                ...(description && { description }),
                ...(category    && { category }),
                ...(stock !== undefined && stock !== null && { stock: Number(stock) }),
            },
        });

        return NextResponse.json(
            {
                message: "Product updated successfully",
                product: updated_product,
            },
            { status: 200 }
        );

    } catch (error: unknown) {

        console.error(error);

        // Prisma "record not found" error code
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code: string }).code === "P2025"
        ) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
