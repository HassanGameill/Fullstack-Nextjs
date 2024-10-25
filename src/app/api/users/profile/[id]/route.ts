import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/db/db";
import { VerifyToken } from "@/utils/VerifyToken/VerifyToken";
import { IUpdateUserDto } from "@/utils/Dtos/dtos";
import bcrypt from "bcryptjs"
import { updateUserSchema } from "@/utils/ValidationShemas/ValidationShemas";

interface Props {
  params: { id: string };
}



/**
 *
 * @method  DELETE
 * @route    ~/api/user/profile/:id
 * @desc     Delete Profile
 * @access   private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comment: true}
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }



    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    
    if (!token) {
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 } // Unauthorized
      );
    }

    const userFromToken = VerifyToken(request)
    
    if (userFromToken !== null && userFromToken.id === user.id) {
      // Deleteing the user
      await prisma.user.delete({ where: { id: parseInt(params.id)}});

      // Deleting the comments that belong this user
      const commentIds: number[] = user?.comment.map(comment => comment.id);
      await prisma.comment.deleteMany({
        where: {id: {in: commentIds}}
      })



      return NextResponse.json(
        { message: "your profile (account) has been delete" },
        { status: 200 }
      );
    }

    return NextResponse.json(
        { message: "onley user himself can delleted his profile, forbidden" },
        { status: 403 } // forbidden
      );
      

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}





/**
 *
 * @method  GET
 * @route    ~/api/user/profile/:id
 * @desc     Get Profile By ID
 * @access   private (Only user himself can get his account/prrofile)
 */


export async function GET(request: NextRequest, {params}: Props) {

  try {

    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id)},
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true
      }
    });


    if (!user) {
      return NextResponse.json({message: "User Not Found"}, {status: 404});
    }

    

    const userFromToken = VerifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        {message: "You are not allowed, access denied"},
        {status: 403}
      )
    }

    return NextResponse.json(user, {status: 200})



  } catch (error) {

    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );

  }
}






/**
 *
 * @method  PUT
 * @route    ~/api/user/profile/:id
 * @desc     Update Profile
 * @access   private (Only user himself can Update his account/prrofile)
 */



export async function PUT(request: NextRequest, {params}: Props) {

  try {

    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id)}});

    if (!user) {
      return NextResponse.json({message: "User Not Found"}, {status: 404});
    }

    const userFromToken = VerifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json({message: "Your are not allowed, access deined"}, {status: 403});
      
    }


    const body = await request.json() as IUpdateUserDto;
    const validateion = updateUserSchema.safeParse(body)

    if (!validateion.success) {
      return NextResponse.json(
        {message: validateion.error.errors[0].message},
        {status: 400}
      )

    }


    // Make Salt for bassword before make update to secure your password
    if (body.password) {
      // Validation If Password minimum 6
      
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt)
    }



    const updatedUser =  await prisma.user.update({
      where: {id: parseInt(params.id)},
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      }
    });
    

    const {password, ...other} = updatedUser


    return NextResponse.json({...other}, {status: 200})





  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}
