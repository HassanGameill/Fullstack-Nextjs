import React from "react";
import ArticalsCard from "./ArticalsCard";
import GridList from "@/components/common/LogicList/GridList/GridList";
import { Article } from "@prisma/client";
import { Metadata } from "next";
import { GetArticles } from "@/APICalles/ArticlesApiCall";
import SearchArticleInput from "./Search";






export const metadata: Metadata = {
  title: 'Articles Page',
  description: 'Articles about programming',
}

interface ArticlesPageProps {
  searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams } : ArticlesPageProps) => {
    const { pageNumber  } = searchParams || {};

  const articles: Article[] = await GetArticles(pageNumber);

  const renderCategories = (itemData: Article) => (
    <div>
      <ArticalsCard {...itemData} />
    </div>
  );

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div>
        <GridList records={articles} renderItem={renderCategories} />
      </div>
    </section>
  )
}

export default ArticlesPage;
