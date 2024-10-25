import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "@/utils/VerifyToken/VerifyToken";
import prisma from "@/utils/db/db";
import { IUpdateCommentDto } from "@/utils/Dtos/dtos";




interface Props {
  params: { id: string };
}


/**
 *
 * @method  PUT
 * @route    ~/api/user/profile/:id
 * @desc     Update Comment
 * @access   private (only owner of the comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }

    // If User has accsess on comment
    const user = VerifyToken(request);

    // If all things is done, We Allowed to user edite on your comment
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "You are not allowed, accsess denied" },
        { status: 403 }
      );
    }

    const body = (await request.json()) as IUpdateCommentDto;

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text },
    });

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}





/**
 *
 * @method  DELETE
 * @route    ~/api/user/profile/:id
 * @desc     DELTE Comment
 * @access   private (only Admin OR owner of the comment)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {

    const comment = await prisma.comment.findUnique({
        where: { id: parseInt(params.id) },
      });

      // If User has comment
    const user = VerifyToken(request);


    // If all things is done, We Allowed to user edite on your comment
    if (user === null) {
        return NextResponse.json(
          { message: "No token provided, access denied" },
          { status: 401 }
        );
      }


      if (!comment) {
        return NextResponse.json(
          { message: "comment not found" },
          { status: 404 }
        );
      }


      if (user.isAdmin || user.id === comment.userId) {
        await prisma.comment.delete({
            where: {id: parseInt(params.id)}
        })

        return NextResponse.json(
            { message: "your comment deleted"},
            {status: 200}
        )

      }

      return NextResponse.json(
        { message: "You are not allowed, accsess denied"},
        {status: 403}
      )





  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );
  }
}
