import { ILoginUserDto } from "@/utils/Dtos/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/db/db";
import { loginSchema } from "@/utils/ValidationShemas/ValidationShemas";
import bcrypt from "bcryptjs";
import { SetGenrateCookie } from "@/utils/GenrateTokens/SetGenrateCookie";

/**
 * @method  POST
 * @route   ~/api/user/login
 * @desc    Login User (Sign In)
 * @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ILoginUserDto;

    // Validate request body
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const errorMessage = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Please create an account, no user found with this email" },
        { status: 404 } // 404 Not Found for a missing user
      );
    }

    // Check if password matches
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid Email or Password" },
        { status: 401 } // 401 Unauthorized for invalid credentials
      );
    }

    // Generate JWT token and set cookie
    const cookie = SetGenrateCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    });

    return NextResponse.json(
      { message: "Authenticated" },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    console.error("Login error: ", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
