import { IUpdateArticleDto } from "@/utils/Dtos/dtos";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/db/db";
import { VerifyToken } from "@/utils/VerifyToken/VerifyToken";

interface Props {
  params: { id: string };
}

/**
 *
 * @method  GET
 * @route    ~/api/articles/:id
 * @desc     Get single article by Id
 * @access   public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true,
                
              }
            },


          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
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
 * @method  PUT
 * @route    ~/api/articles/:id
 * @desc     Upadete Article
 * @access   private (only admin can update article)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function PUT(request: NextRequest, { params }: Props) {
  try {

    // Admin can update Article 
    const user = VerifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denide"},
        { status: 403}
      )
    }



    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    const body = (await request.json()) as IUpdateArticleDto;
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });

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
 * @method   DELETE
 * @route    ~/api/articles/:id
 * @desc     Delete Article
 * @access   private (Admin can make delete Article)
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    // Admin can DELETE Article 
    const user = VerifyToken(request);

    if (user === null || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin, access denide"},
        { status: 403}
      )
    }

    const article = await prisma.article.findUnique({
      where: {id: parseInt(params.id)},
      include: {comments: true}
    });
  
    if (!article) {
      return NextResponse.json({ message: "article not found" }, { status: 404 });
    }

    // Delateing The Article
  
    await prisma.article.delete({where: {id: parseInt(params.id)}})

    //  deleteing the comments that belong this article 
    const commentsIds: number[] = article?.comments.map( comment => comment.id);
    await prisma.comment.deleteMany({
      where: {id: { in: commentsIds}}
    });

  
    return NextResponse.json({message: "Articale Deleted"}, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { message: "intrnal server error" },
      { status: 500 }
    );

  }
}
