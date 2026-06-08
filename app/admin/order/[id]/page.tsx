
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { request } from "https";
import { NextResponse } from "next/server";

const orderpageinadmin = async (request: Request) => {
    const { getUser } = getKindeServerSession();
    const orderId = request.url.split("/").pop();
    if (!orderId) {
        return NextResponse.json({ message: "Order ID is required" }, { status: 400 });
    }

    return (
        <>
            <h1 className="text-white">Order Details</h1>
        </>
    )
}   

export default orderpageinadmin;