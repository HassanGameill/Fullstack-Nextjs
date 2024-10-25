import { Link } from "@/navigation";
import React from "react";
import { FaHome, FaBook, FaNewspaper, FaHandshake } from "react-icons/fa"; // Importing icons, added FaHandshake for Partners

interface IData {
  id: number;
  title: string;
  subtitle: string;
  pathname: string;
  icon: JSX.Element;
}

const DashboardLinks: IData[] = [
  {
    id: 1,
    title: "Home",
    subtitle: "Back to homepage",
    pathname: "/",
    icon: <FaHome />, // Home icon
  },
  {
    id: 2,
    title: "Partners",
    subtitle: "Learn more about our partners",
    pathname: "/partners",
    icon: <FaHandshake />, // Partners icon
  },
  {
    id: 3,
    title: "Blog",
    subtitle: "Read our latest posts",
    pathname: "/blog",
    icon: <FaBook />, // Blog icon
  },

  {
    id: 4,
    title: "Articles",
    subtitle: "Manage articles",
    pathname: "/admin/articles-table?pageNumber=1",
    icon: <FaNewspaper />, // Articles icon
  },

  {
    id: 5,
    title: "Comments",
    subtitle: "Read our latest posts",
    pathname: "/admin/comments",
    icon: <FaBook />, // Blog icon
  },
];

const AdminSidebar = () => {
  return (
    <div className="mt-16 bg-[#FEFAE0] dark:bg-slate-900 shadow-xl h-[100vh] w-15 lg:w-1/5 p-2 lg:p-4 overflow-hidden">
      <div className=" ">
        <div >
          <Link href="/admin" aria-label="Dashboard">
            <span className="text-[10px] lg:text-xl  font-semibold">Dashboard</span>
          </Link>
        </div>

        <div className="space-y-2 container ">
          {DashboardLinks.map((item) => (
            <div key={item.id} className="py-2">
              <Link href={item.pathname} aria-label={item.title}>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <span className="hidden lg:block  text-lg">{item.title}</span>
                    {item.subtitle && (
                      <span className="hidden lg:block  text-sm text-gray-400">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
