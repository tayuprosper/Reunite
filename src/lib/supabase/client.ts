import { createBrowserClient } from "@supabase/ssr";


export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !key) {
    throw new Error("Supabase env vars not set");
  }

  return createBrowserClient(url, key);
};

export const supabase = createClient();