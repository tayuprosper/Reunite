import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 200 }
    );

  } catch (error: any) {
    alert("Error")
    // ✅ Always log the full error
    console.error("Signup error:", error);

    // Prisma-specific error
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: `Account with this ${error.meta?.target?.join(", ")} already exists`,
        },
        { status: 400 }
      );
    }

    // ✅ Fallback for unknown errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
