import { IRegisterUserDto } from "@/utils/Dtos/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/db/db";
import { registerSchema } from "@/utils/ValidationShemas/ValidationShemas";
import bcrypt from "bcryptjs";
import { SetGenrateCookie } from "@/utils/GenrateTokens/SetGenrateCookie";

/**
 *
 * @method  Post
 * @route    ~/api/user/register
 * @desc     Create New User [(Register)] Sing Up
 * @access   public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IRegisterUserDto;
    const Validateion = registerSchema.safeParse(body);

    if (!Validateion.success) {
      return NextResponse.json(
        { message: Validateion.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user) {
      return NextResponse.json(
        {
          message: "this user already registered",
        },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });

    // Genrate Token with JWT Token

    const cookie = SetGenrateCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    });

    return NextResponse.json(
      { ...newUser, message: "Registered &  Authentcated" },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}
