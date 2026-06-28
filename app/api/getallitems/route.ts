import { prisma } from "@/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const category = req.nextUrl.searchParams.get("category");
    const highlight = req.nextUrl.searchParams.get("highlight");
    const color = req.nextUrl.searchParams.get("color")?.toLowerCase();
    const mainCategory = req.nextUrl.searchParams.get("mainCategory");
    const subCategory = req.nextUrl.searchParams.get("subCategory");
    const maaterial = req.nextUrl.searchParams.get("material");

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (highlight === "true") where.highlight = true;
    if (color) where.Color = color;
    if (mainCategory) where.MainCategory = mainCategory;
    if (subCategory) where.SubCategory = subCategory;
    if (maaterial) where.Material = maaterial;

   const products = await prisma.product.findMany({
        where: Object.keys(where).length ? where : undefined,
   })

    return NextResponse.json(products);
}