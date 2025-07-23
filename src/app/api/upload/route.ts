import { createClient } from "@/lib/supbaseServerClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export  async function POST(req: Request){
    const cookie = await cookies();
    const supabase = await createClient(cookie);
    const formdata = await req.formData();
    const file = formdata.get("file") as File;

    if(!file){
        return NextResponse.json({"error": "please attach a file"}, {status: 400})
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const  { data: { user }} = await supabase.auth.getUser();
    const filePath = `${user?.id}/${file.name}`;

    const { data, error } =await supabase.storage.from('reunite-store')
    .upload(filePath, fileBuffer, {
        contentType: file.type,
    })


    if(error){
        return NextResponse.json({"error": error.message}, {status: 400});
    }

    const path = supabase.storage
  .from('reunite-store')
  .getPublicUrl(filePath).data

  return NextResponse.json({data: path.publicUrl}, {status: 200});
}