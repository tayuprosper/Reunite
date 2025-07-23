import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req: Request){
    const cookie = await cookies();
    const supabase = await createClient(cookie);
    const formdata = await req.json();
    
    const { data: { user }} = await supabase.auth.getUser();
    const authData = {
        ...formdata,
        userid: user?.id
    }
    const {data, error} = await supabase.from("items").insert(authData);
    
    if(error){
        return NextResponse.json({"error": error.message}, {status: 400});
    }

    return NextResponse.json({"data": data},{status: 200});
}