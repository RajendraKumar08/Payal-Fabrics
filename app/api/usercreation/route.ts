import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const existing_user = await prisma.user.findUnique({
      where: {
        kindeId: user.id,
      },
    });

    if (!existing_user) {

      await prisma.user.create({
        data: {
          kindeId: user.id,
          email: user.email || "",

          name:
            user.given_name && user.family_name
              ? `${user.given_name} ${user.family_name}`
              : user.given_name || "User",

          profileImage: user.picture || "",

          role: "USER",
        },
      });

      console.log("User created successfully");
    }

    return NextResponse.redirect(
      new URL("/", process.env.KINDE_SITE_URL || "http://localhost:3000")
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}