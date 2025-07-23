import { createClient } from "@/lib/supbaseServerClient";
import { sup } from "framer-motion/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    const cookie = await cookies();
    const supabase = await createClient(cookie);

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    const { data , error } = await supabase.from("items").select("*").eq("id", itemId)

    if (error){
        return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json({data: data}, {status: 200})
}