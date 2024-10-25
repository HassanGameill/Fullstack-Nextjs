"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import menuData from "./menuData";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import LocaleSwitcher from "@/components/LocalSwitcher/local-switcher";
import ThemeToggler from "./ThemeToggler";

interface MenuItem {
  title: string;
  path?: string; // Allow `path` to be undefined
  submenu?: { title: string; path?: string }[]; // Allow submenu `path` to be undefined
}

interface NavProps {
  navbarOpen: boolean;
  navbarToggleHandler: () => void;
  isAdmin?: boolean;
}

const Nav: React.FC<NavProps> = ({
  isAdmin,
  navbarOpen,
  navbarToggleHandler,
}) => {
  // Login Token
  const [toggle, setToggle] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | -1>(-1);

  // Translation and Locale Handling
  const t = useTranslations("Menu");
  const menuLinks: MenuItem[] = menuData(t);
  const locale: string = useLocale();
  const pathname: string | null = usePathname();

  // Submenu Toggle
  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  

  // Helper to render submenu
  const renderSubmenu = (submenu: MenuItem[], index: number) => (
    <div
      className={`submenu relative left-0 top-full rounded-sm bg-white dark:bg-dark transition-all duration-300 lg:absolute lg:top-[110%] lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100 lg:shadow-lg ${
        openIndex === index ? "block" : "hidden"
      }`}
    >
      {submenu.map((submenuItem, idx) => (
        <Link
          href={submenuItem.path || "#"} // Use a default path if `submenuItem.path` is undefined
          key={idx}
          className="block rounded py-2.5 text-sm text-white hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
        >
          {submenuItem.title}
        </Link>
      ))}
    </div>
  );

  return (
    <nav
      id="navbarCollapse"
      className={`navbar absolute right-0 z-30 w-[250px] rounded border-[0.5px] border-body-color/50 bg-white dark:bg-dark lg:dark:bg-transparent px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${
        navbarOpen
          ? "visible top-full opacity-100"
          : "invisible top-[120%] opacity-0"
      }`}
    >
      <ul
        className={`block lg:flex lg:text-center lg:items-center lg:justify-center font-[400] lg:gap-10 ${
          locale === "ar" ? "__rtl_lang font-[500]" : ""
        }`}
      >
        {menuLinks.map((menuItem, index) => (
          <li key={index} className="group relative">
            {menuItem.path ? (
              <Link
                href={menuItem.path}
                className={`flex py-2 text-base lg:text-[14.5px] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                  pathname === menuItem.path
                    ? "text-primary dark:text-white"
                    : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                }`}
                onClick={navbarToggleHandler}
              >
                {menuItem.title}
              </Link>
            ) : (
              <>
                <button
                  aria-expanded={openIndex === index}
                  aria-controls={`submenu-${index}`}
                  onClick={() => handleSubmenu(index)}
                  className="flex w-full items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                >
                  {menuItem.title}
                  <span className="pl-3">
                    <svg width="25" height="24" viewBox="0 0 25 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
                <div id={`submenu-${index}`}>
                  {renderSubmenu(menuItem.submenu || [], index)}
                </div>
              </>
            )}
          </li>
        ))}

        {isAdmin && (
          <Link
            onClick={() => setToggle(false)}
            className={""}
            href="/admin"
          >
            Admin Dashboard
          </Link>
        )}

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggler />
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
