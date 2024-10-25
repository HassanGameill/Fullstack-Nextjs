import { DOMAIN } from "@/utils/Constans/Constans";
import { Article } from "@prisma/client";

// _____ Get Articale Based on Page Number ______

export async function GetArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  // Provide a fallback value for `pageNumber`

  const res = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}




// ________ Get Articles Count _________
export async function GetArticlesCount(): Promise<number> {
  // Provide a fallback value for `pageNumber`

  const res = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get articles count");
  }

  const { count } = (await res.json()) as { count: number };

  return count;
}

// ________ Get Articles Based on Search Text _______
export async function GetArticlesBasedOnSearch(
  searchText: string
): Promise<Article[]> {
  // Provide a fallback value for `pageNumber`

  const res = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get articles count");
  }

  return res.json();
}


// ______ Get Single article by id _______ //

export async function GetSingleArticle(articleId: string) {
  const res = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get articles count");
  }

  return res.json();
}
