import Jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {prisma} from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { use } from "react";


const secrets = process.env.SECRETS;
export async function POST(req: Request){
    try {
    const { email, password } = await req.json()
    
   
   
const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    fullName: true,
    email: true,
    password: true, // include password explicitly
  },
});


    if (!user){
        return NextResponse.json(
            { error: "Invalid email or password"},
            {status: 401},
        )
    }

    const isPasswordCorect = await bcrypt.compare(password, user.password);
if(!isPasswordCorect){
    return NextResponse.json({ error: 'Invalid credentials email or password'}, { status:401})
        
    }
    
  const token = Jwt.sign({id: user.id, email: user.email}, secrets!,{ expiresIn: "7d"});
    
    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    })

    return NextResponse.json({message: "Logged in seccessfully"});
    }catch(err: any){
        console.log("Login error:", err);
        return NextResponse.json({ error: "Internal server error"});
    }
}