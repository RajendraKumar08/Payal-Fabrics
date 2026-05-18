import { prisma } from "@/prisma-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    return {"message" : "Hey this is updat item page"}
    
    
}