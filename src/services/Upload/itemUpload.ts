import { createClient} from "@/lib/supabase/client";

export const itemUploadService = {
    
    async uploadItem(item: Record<string, string>){
        const supabase =  createClient();
        const { data, error } = await supabase.from("items").insert(item);

        if (error){
            console.error("Error uploading item: ", error.message);
            return null;
        }

        return data;
    }
   
    
}