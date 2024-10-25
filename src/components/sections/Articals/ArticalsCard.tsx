import React from "react";
import { Link } from "@/navigation";
import { Article } from "@prisma/client";



const ArticalsCard = ({ id, title, description, createdAt }: Article) => {
  return (
    <div
      key={id}
      className={`flex items-center flex-col cursor-pointer text-gray-400 mx-5  bg-white  py-3 my-6 shadow-blue-300 shadow-lg dark:shadow-blue-400 rounded-md duration-300 hover:shadow-one hover:scale-110 transform transition-all ease-in-out hover:grayscale-0 `}
    >
      <div className="container py-2">
        <h1 className="text-[14px] text-black font-semibold line-clamp-1">
          {title}
        </h1>
        <div className="text-[10px]">
          {new  Date(createdAt).toDateString()}
        </div>
        <p className="text-[12px] line-clamp-2">{description}</p>
        <div className="flex justify-center pt-4">
          <Link href={`/articles/${id}`} className="bg-blue-950 text-[12px] text-white px-4 py-2 rounded-md">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticalsCard;
