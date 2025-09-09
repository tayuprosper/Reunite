import { createClient } from "@/lib/supabase/client";

export const ItemFetch = {
    async fetchItemWithId(itemId: number) {
        const supabase = createClient();
        const { data, error } = await supabase.from("items").select("*").eq("id", itemId).single();

        if (error) {
            console.error("Error fetching item: ", error.message);
            return null;
        }

        return data;
    },

    async fetchAllItems() {
        const supabase = createClient();
        const { data, error } = await supabase.from("items").select("*").order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching items: ", error.message);
            return [];
        }

        return data;
    },

    async fetchItemsByUserId(userId: string) {
        const supabase = createClient();
        const { data, error } = await supabase.from("items").select("*").eq("userid", userId).order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching items for user: ", error.message);
            return [];
        }

        return data;
    }, 

    // async fetchItemsByStatus(status: string) {
    //     // Implementation for fetching items by status (e.g., "found", "lost")
    // },

    //get items not posted by current user
    async fetchItemsNotByUserId(userId: string) {
        const supabase = createClient();
        const { data, error } = await supabase.from("items").select("*").neq("userid", userId).order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching items not by user: ", error.message);
            return [];
        }

        return data;
    }

}