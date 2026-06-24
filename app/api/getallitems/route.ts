import { prisma } from "@/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get("category");
    const highlight = req.nextUrl.searchParams.get("highlight");
    const color = req.nextUrl.searchParams.get("color")?.toLowerCase();

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (highlight === "true") where.highlight = true;
    if (color) where.Color = color;

   const products = await prisma.product.findMany({
        where: Object.keys(where).length ? where : undefined,
   })

    return NextResponse.json(products);
}