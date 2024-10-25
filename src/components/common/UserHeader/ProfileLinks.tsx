"use client"
import { Link } from "@/navigation";
import React, { useState } from "react";

function ProfileLinks() {
  // State to manage avatar dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle avatar dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="  lg:block relative rounded-full cursor-pointer w-[30px] h-[30px] bg-red-700"
      onClick={toggleDropdown}
    >
      <span className="">wrlcome</span>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:bg-gray-700 dark:text-white">
          <Link href="/admin">
            <span className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
              Profile
            </span>
          </Link>
          <Link href="/signin">
            <span className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
              Sign In
            </span>
          </Link>
          <Link href="/login">
            <span className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
              Login
            </span>
          </Link>
          <Link href="/settings">
            <span className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
              Settings
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfileLinks;
