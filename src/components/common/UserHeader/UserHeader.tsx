"use client";
import { useEffect, useState } from "react";

import Nav from "./Nav";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "@/navigation";

const UserHeader = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

 

  

  // Toggle navbar visibility
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };


 

  return (
    <header
      dir="ltr"
      className={`header left-0 top-0 z-40 flex w-full items-center  ${
        
           "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] py-3 lg:py-0 bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          
      }`}
    >
      <div className="container">
        <div className="relative -mx-2 flex items-center justify-between">
          {/* Logo */}
          <div className="w-[100px] md:w-[120px] lg:w-[150px] ">
            <Link href="/">Branding</Link>
          </div>

          {/*______ Nav component - controlled by navbarOpen ______*/}
          <Nav
            navbarOpen={navbarOpen}
            navbarToggleHandler={navbarToggleHandler}
          />

          {/*______ Menu toggler, Locale Switch, Theme Toggler, and Admin Avatar _____*/}

          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <HiBars3
                onClick={navbarToggleHandler}
                className="text-[33px] cursor-pointer lg:hidden"
              />


             
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;



