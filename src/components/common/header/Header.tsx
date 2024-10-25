import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import { VerifyTokenForPage } from "@/utils/VerifyToken/VerifyToken";
import { Link } from "@/navigation";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = VerifyTokenForPage(token);

  return (
    <header
      className={`header  left-0 top-0 z-40 flex w-full items-center  ${"dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] py-3 lg:py-4 bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"}`}
    >
      <div className="container flex items-center justify-between ">
        <div className="relative -mx-2 flex items-center justify-between">
          {/* Logo */}
          <div className="w-[100px] md:w-[120px] lg:w-[150px] ">
            <Link href="/">Branding</Link>
          </div>
        </div>

        <Navbar isAdmin={payload?.isAdmin || false} />

        <div className={styles.right}>
          {payload ? (
            <>
              <strong className="text-blue-800 md:text-xl capitalize">
                {payload?.username}
              </strong>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link className="" href="/login">
                Login
              </Link>
              <Link className="" href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
