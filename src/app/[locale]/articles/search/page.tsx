import { GetArticlesBasedOnSearch } from "@/APICalles/ArticlesApiCall";
import ArticleItem from "@/components/sections/Articals/ArticleItem";
import { Article } from "@prisma/client";
import React from "react";

interface SearchArticlePageProps {
  searchParams: { searchText: string };
}

const SearchArticlesPage = async ({
  searchParams: { searchText },
}: SearchArticlePageProps) => {
  const articles: Article[] = await GetArticlesBasedOnSearch(searchText);

  return (
    <section className=" pt-40 fix-height container m-auto px-5 ">
      {articles.length === 0 ? (
        <h2 className="text-gray-800 text-2xl font-bold p-5">
          Articles based on search{" "}
          <span className="text-red-500">{searchText}</span>
          {" "}not found
        </h2>
      ) : (
        <>
          <h1 className="text-2x1 font-bold">
            Articles based on{" "} 
            <span className="sm-1 text-green-700 text-3x1 font-bold">
              {searchText}
            </span>
          </h1>

          <div className="flex items-center justify-center flex-wrap gap-7">
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SearchArticlesPage;
