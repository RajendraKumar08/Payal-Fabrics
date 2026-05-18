import { prisma } from "@/prisma-db";

export async function GET() {
    const products = await prisma.product.findMany()
}