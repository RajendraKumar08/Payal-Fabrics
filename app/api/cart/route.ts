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
  const incomingProductIds = cart.map((item) => item.id);

  await prisma.$transaction([
    prisma.cartItem.deleteMany({
      where: {
        userId,
        productId: {
          notIn: incomingProductIds.length > 0 ? incomingProductIds : undefined,
        },
      },
    }),
    ...cart.map((item) =>
      prisma.cartItem.upsert({
        where: {
          userId_productId: {
            userId,
            productId: item.id,
          },
        },
        create: {
          userId,
          productId: item.id,
          quantity: item.quantity,
        },
        update: {
          quantity: item.quantity,
        },
      })
    ),
  ]);

  return NextResponse.json({ message: "Cart updated" });
}
