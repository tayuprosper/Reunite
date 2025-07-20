import { cookies } from "next/headers";
import  Jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SECRETS  =process.env.SECRETS!;

export async function GET(){
    const token = (await cookies()).get("token")?.value;

    if (!token){
        return NextResponse.json({ user: null}, {status: 401})
    }

    try {
        const decode = Jwt.verify(token, SECRETS) as {id: number};

        const user = await prisma.user.findUnique({
            where: { id: decode.id},
            select: { id: true, email: true, fullName: true}
        })

        if (!user){
            return NextResponse.json({user: null}, { status: 401});
        }

        return NextResponse.json({ user });
    }catch(error){
        return NextResponse.json({ user: null}, {status: 401});
    }


} 