import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "@/utils/VerifyToken/VerifyToken";
import { ICreateCommentDto } from "@/utils/Dtos/dtos";
import { CreateCommentSchema } from "@/utils/ValidationShemas/ValidationShemas";
import prisma from "@/utils/db/db";

/**
 *
 * @method  POST
 * @route    ~/api/comments
 * @desc     Create New Comment
 * @access   private (only login user)
 */

export async function POST(request: NextRequest) {
  try {
    // Verify the user's token
    const user = VerifyToken(request);

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        { message: "Only logged-in users can comment. Access denied." },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = (await request.json()) as ICreateCommentDto;

    // Validate the request body using the validation schema
    const validation = CreateCommentSchema.safeParse(body);
    if (!validation.success) {
      // Return the first validation error message
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create the new comment in the database
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: user.id, // Use the user ID from token verification
      },
    });

    // Return the new comment with status 201 (Created)
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    // Log the error for better debugging
    // Return a more descriptive error message for the client
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}







/**
 *
 * @method  GET
 * @route    ~/api/comments
 * @desc     Get All Comments
 * @access   private (only Admin)
 */




export async function GET(request: NextRequest) {
  try {

    const user = VerifyToken(request);

    // Must bbe user is Admin Condition
    // Or User is Admin === false
    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: 'Only Admin , accsess denied'},
        { status: 403 }

      )

    }


    // Get All comments For Admin

    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, {status: 200});



  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );

  }

}


