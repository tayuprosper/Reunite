import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookie = await cookies();
    const supabase = await createClient(cookie);

    const { data: {user} } = await supabase.auth.getUser();
    const { data: itemsData, error: itemsError } = await supabase.from('items').select("*").eq("userid", user?.id);

    if (itemsError){
        return NextResponse.json({"error": itemsError.message},{status: 400})
    }
    return NextResponse.json({"data": itemsData}, {status: 200})
}