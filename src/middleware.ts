import { NextRequest} from "next/server";
import { createClient } from "./utils/supabase/middleware";

export function middleware(request: NextRequest) {
  console.log("✅ Middleware triggered:", request.nextUrl.pathname);
  return createClient(request)
  
}

export const config = {
    matcher: [
      "/auth/:path*",
      "/profile",
      "/profile/:path*",
      "/dashboard/:path*"
    ]
}