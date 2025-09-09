import { authService } from "@/services/auth/authservice";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await authService.signUp(email, password);
    
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Signup error:", error.message);
      return NextResponse.json(
        { error: "Signup failed. Please try again." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};