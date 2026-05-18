import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

export async function POST(req: NextRequest) {

    try {

        const body = await req.json();

        const {
            itemname,
            price,
            description,
            category,
            stock_quantity,
            stock_unit,
        } = body;

        if (
            !itemname ||
            !price ||
            !description ||
            !category ||
            !stock_quantity ||
            !stock_unit
        ) {
            return NextResponse.json(
                {
                    message: "All fields are required",
                },
                {
                    status: 400,
                }
            );
        }

        const created_product = await prisma.product.create({
            data: {
                name: itemname,
                price: Number(price),
                description: description,
                category: category,
                stock: Number(stock_quantity),
            },
        });

        return NextResponse.json(
            {
                message: "Product created successfully",
                product: created_product,
            },
            {
                status: 201,
            }
        );

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}