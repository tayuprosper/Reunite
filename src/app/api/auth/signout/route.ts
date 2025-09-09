import { authService } from "@/services/auth/authservice";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response  = await authService.signOut();
    if (response) {
        console.log("Sign out successful");
         return NextResponse.json({
            error: false,
            status: 200
            
         })
    }

    return NextResponse.json({
        error: true,
        status: 500
    })

    // Redirect to home page after successful sign out
   
  } catch (error) {
    console.error("Sign out error:", error);
  }
}