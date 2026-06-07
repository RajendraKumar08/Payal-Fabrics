import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";
import { uploadImageToCloudinary } from "@/cloudinary";

export async function POST(req: NextRequest) {

    try {

        const formData = await req.formData();

        const itemname = formData.get("itemname");
        const price = formData.get("price");
        const description = formData.get("description");
        const category = formData.get("category");
        const stock_quantity = formData.get("stock_quantity");
        const stock_unit = formData.get("stock_unit");
        const highlightValue = formData.get("highlight");
        const imageFile = formData.get("image");

        if (
            itemname == null ||
            price == null ||
            description == null ||
            category == null ||
            stock_quantity == null ||
            stock_unit == null ||
            highlightValue == null ||
            imageFile == null
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

        if (!(imageFile instanceof File) || imageFile.size === 0) {
            return NextResponse.json(
                {
                    message: "Product image is required",
                },
                {
                    status: 400,
                }
            );
        }

        const imageUrl = await uploadImageToCloudinary(Buffer.from(await imageFile.arrayBuffer()));

        const created_product = await prisma.product.create({
            data: {
                name: String(itemname),
                image: imageUrl,
                price: Number(price),
                description: String(description),
                category: String(category),
                stock: Number(stock_quantity),
                highlight: String(highlightValue) === "true",
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