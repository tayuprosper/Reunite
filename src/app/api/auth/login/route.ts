import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secrets = process.env.SECRETS;
export async function POST(req: Request){
    const cookie = await cookies();
const supabase = await createClient(cookie);
    const { email, password } = await req.json()
    const { data, error } = await supabase.auth.signInWithPassword(
        {
            email,
            password
        }
    )
   

    if(error){
        return NextResponse.json({ error: error.message },{status: 400})
    }

    return NextResponse.json({user: data.user},{status: 200})

}