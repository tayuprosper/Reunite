import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookie = await cookies();
    const supabase = await createClient(cookie);

    const { data, error } = await supabase.auth.getUser();

    if(error){
        return NextResponse.json({"error": "not authenicated"}, {status: 401})
    }

    return NextResponse.json({user: data.user}, {status: 200});
}