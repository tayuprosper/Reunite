import { NextResponse } from "next/server";
import { z } from "zod";
import { authService } from "@/services/auth/authservice";  
import { SupabaseCredetialsError } from "@/utils/errors/supabase-errors";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const schema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });
    const { email, password } = schema.parse(body);
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }
    const {user} = await authService.signIn(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    if (error instanceof SupabaseCredetialsError) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};

//todo
/**
 * 
 */