import { Database } from "./supabase";

export type Item = Database["public"]["Tables"]["items"]["Row"];

// You can also define types for inserting and updating items if needed
export type NewItem = Database["public"]["Tables"]["items"]["Insert"];
export type UpdateItem = Database["public"]["Tables"]["items"]["Update"];