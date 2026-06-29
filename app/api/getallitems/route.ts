import { prisma } from "@/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get('category')

    console.log("Fetching items for category:", category);
    const products = await prisma.product.findMany({
        where: category ? { category: { equals: category, mode: 'insensitive' } } : undefined,
    })

    return NextResponse.json(products);
}