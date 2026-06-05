import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

 

  const dbUser = await prisma.user.findUnique({
    where: { kindeId: user.id },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const cart = dbUser?.cartItems?.map((item) => ({
    id: item.productId,
    name: item.product.name,
    price: item.product.price,
    image: item.product.image ?? "",
    category: item.product.category,
    quantity: item.quantity,
  })) ?? [];

  return NextResponse.json({ cart });
}

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  type CartPayloadItem = {
    id: string;
    quantity: number;
  };

  const cart: CartPayloadItem[] = Array.isArray(body.cart)
    ? body.cart.map((item: any) => ({
        id: String(item.id),
        quantity: Number(item.quantity) || 1,
      }))
    : [];

  const dbUser = await prisma.user.findUnique({ where: { kindeId: user.id } });
  if (!dbUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const userId = dbUser.id;

  const operations = [
    prisma.cartItem.deleteMany({ where: { userId } }),
  ];

  if (cart.length > 0) {
    operations.push(
      prisma.cartItem.createMany({
        data: cart.map((item) => ({
          userId,
          productId: item.id,
          quantity: item.quantity,
        })),
        skipDuplicates: true,
      })
    );
  }

  try {
    await prisma.$transaction(operations);
  } catch (error) {
    return NextResponse.json(
      { message: "Cart update failed", error: String(error) },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Cart updated" });
}
