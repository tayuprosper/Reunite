import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookie = await cookies();
const supabase = await createClient(cookie);
    const { fullName, email, phone, password } = await req.json();

   const { data, error } = await supabase.auth.signUp({
    email, password
   })

   if (error){
      return  NextResponse.json({"error": error.message}, {status: 400})
   }
   return NextResponse.json({user: data.user}, {status: 200});

}
