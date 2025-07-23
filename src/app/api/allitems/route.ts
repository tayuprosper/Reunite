import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export  async function GET(){
    const cookie =await  cookies();
    const supabase = await createClient(cookie);

    const { data: {user} } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("items").select("*").neq("userid", user?.id);
    // .neq("userid", user?.id);

    if (error){
        return NextResponse.json({error: error.message}, { status: 400});
    }

    return NextResponse.json({data: data}, {status: 200})
    
}