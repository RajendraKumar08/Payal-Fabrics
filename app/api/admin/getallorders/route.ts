import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";
import { error } from "console";





export async function GET(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user || !user.id){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    const dbuser = await prisma.user.findUnique({
        where: {
            kindeId: user.id,
        }
    });
    
    if(!dbuser || dbuser.role !== "ADMIN"){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    try{
        const response = await prisma.order.findMany({
            orderBy: {
                updatedAt: 'desc'
            }
        });
        console.log("Responses in gerallorder page", response);
        return NextResponse.json(response);
    }
    catch(error){
        console.log("Error fetching order in admin", error);
        return NextResponse.json({message: "Error fetching order in admin", status: 500});
    }
}