import { GetArticles, GetArticlesCount } from "@/APICalles/ArticlesApiCall";
import GridList from "@/components/common/LogicList/GridList/GridList";
import ArticalsCard from "@/components/sections/Articals/ArticalsCard";
import Pagination from "@/components/sections/Articals/Pagination";
import SearchArticleInput from "@/components/sections/Articals/Search";
import { ARTICLE_PER_PAGE } from "@/utils/Constans/Constans";
import prisma from "@/utils/db/db";
import { Article } from "@prisma/client";
import React from "react";

interface ArticlesPageProps {
  searchParams: { pageNumber: string };
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = searchParams;

  const articles: Article[] = await GetArticles(pageNumber);

  const renderCategories = (itemData: Article) => (
    <div>
      <ArticalsCard {...itemData} />
    </div>
  );

  // ______ Pagination Count  ___________
  const count:number = await prisma.article.count();
  
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);


  return (
    <section className="pt-40">
      <div className="container">
      <SearchArticleInput />
      <div>
        <GridList records={articles} renderItem={renderCategories} />
      </div>

      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />

      </div>
      
    </section>
  );
};

export default ArticlesPage;
