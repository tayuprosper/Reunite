import { createClient } from "@/lib/supabase/client";

export const fileUploadService = {
    async uploadFile(file: File, userId: string | undefined){
    const filename = `${Date.now()}-${file.name}`;

    console.log("File name to upload as: ", filename);
        if (!userId){
            console.error("No user ID provided for file upload");
            return null;
        }
    const filepath = `public/${userId}/${filename}`;
    console.log("File path: ", filepath);
    const supabase =  createClient();

        const { error } = await supabase.storage
        .from("reunite-store")
        .upload(filepath,
            file,
             {
                cacheControl: "3600",
                upsert: false,
            }
        )

        if (error){
            console.error("Upload error: ", error.message);
            return null;
        }
    
        const { data: publicUrlData } =  supabase.storage.from("reunite-store").getPublicUrl(`public/${userId}/${filename}`);
        console.log("File uploaded! Public URL: ", publicUrlData.publicUrl);
        return publicUrlData.publicUrl;

    }
}