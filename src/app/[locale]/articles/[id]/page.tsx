import React from "react";
import ArticalsCard from "@/components/sections/Articals/ArticalsCard";
import { GetSingleArticle } from "@/APICalles/ArticlesApiCall";
import { SingleArticle } from "@/utils/types/types";
import AddCommentForm from "@/components/sections/Comments/AddCommentForm";
import CommentItem from "@/components/sections/Comments/CommentItem";
import { cookies } from "next/headers";
import { VerifyTokenForPage } from "@/utils/VerifyToken/VerifyToken";
import { resolve } from "path";

interface ShowArticlesPageProps {
  params: { id: string };
}



const SingleArticlePage = async ({ params }: ShowArticlesPageProps) => {
  
  const token = cookies().get("jwtToken")?.value || "";
  const payload = VerifyTokenForPage(token);

  await new Promise(resolve => setTimeout(resolve, 5000))

  const article: SingleArticle = await GetSingleArticle(params.id)

  

  

  return (
    <section className="container pt-40">
      <ArticalsCard {...article} />

      <div className="pt-7">
        {payload ? (
          <AddCommentForm articleId={article.id}  />

        ) : (
          <p className="text-blue-600 md:text-xl">to wright a comment you should make login first</p>
        )}

      </div>
      

      <div className="pt-5">
        {article.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} userId={payload?.id}  />
        ))}
      </div>
      
    </section>
  );
};

export default SingleArticlePage;
