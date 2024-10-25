import { GetArticles, GetArticlesCount } from "@/APICalles/ArticlesApiCall";
import AddArticleForm from "@/components/C-UI/Admin/Articles/AddAeticleForm";
import Pagination from "@/components/sections/Articals/Pagination";
import { Link } from "@/navigation";
import { ARTICLE_PER_PAGE } from "@/utils/Constans/Constans";
import { Article } from "@prisma/client";
import DeleteArticleButton from "./DeleteArticleButton";
import prisma from "@/utils/db/db";

interface AdminArticlesTableProps {
  searchParams: { pageNumber: string };
}

const AdminArticlesTable = async ({
  searchParams: { pageNumber },
}: AdminArticlesTableProps) => {
  const articles: Article[] = await GetArticles(pageNumber);

  const count: number = await prisma.article.count();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="  p-5 pt-40">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <div className="conatiner">
        <table className="table w-full text-left">
          <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
            <tr>
              <th className="p-1 lg:p-2">Title</th>
              <th className="hidden lg:inline-block lg:p-2">Created At</th>
              <th>Actions</th>
              <th className="hidden lg:inline-block"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-b border-t border-gray-300"
              >
                <td className="p-3 text-gray-700">{article.title}</td>
                <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                  {new Date(article.createdAt).toDateString()}
                </td>
                <td className="p-3">
                  <Link
                    href={`/admin/articles-table/edit/${article.id}`}
                    className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                  >
                    Edit
                  </Link>
                  <DeleteArticleButton articleId={article.id} />
                </td>
                <td className="hidden lg:inline-block p-3">
                  <Link
                    href={`/articles/${article.id}`}
                    className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800"
                  >
                    Read More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pageNumber={parseInt(pageNumber)}
          pages={pages}
          route="/admin/articles-table"
        />

        <div className="container pt-5">
          <AddArticleForm />
        </div>
      </div>
    </section>
  );
};

export default AdminArticlesTable;
