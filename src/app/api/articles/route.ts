import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "../../../utils/ValidationShemas/ValidationShemas";
import { ICreateArticleDto } from "@/utils/Dtos/dtos";
import { Article } from "@prisma/client";
import prisma from "../../../utils/db/db";
import { ARTICLE_PER_PAGE } from "../../../utils/Constans/Constans";
import { VerifyToken } from "@/utils/VerifyToken/VerifyToken";

/**
 *
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get Articles By Page Number
 * @access  public
 */
export async function GET(request: NextRequest) {
  try {
    // Get Page Number for each article, default to 1
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    // Validate if pageNumber is a valid number
    const page = parseInt(pageNumber);
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: 400 }
      );
    }

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (page - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 *
 * @method  POST
 * @route   ~/api/articles
 * @desc    Create new article
 * @access  private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user token
    const user = VerifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Only admin, access denied" },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = (await request.json()) as ICreateArticleDto;

    // Validate input data using the schema
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Create a new article in the database
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
