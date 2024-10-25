import AdminSidebar from "@/components/C-UI/Admin/AdminSidebar/AdminSidebar";
import { VerifyTokenForPage } from "@/utils/VerifyToken/VerifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: IAdmin) {

  

  // _______ Get the token from cookies _____ //
  const token = cookies().get("jwtToken")?.value;
  // ______ If no token, redirect to home ______ //
  if (!token) {
    redirect("/");
  }

  // ______ Verify the token for admin access ______ //
  const payload = VerifyTokenForPage(token);

  // ______ If not an admin, redirect to home _______ //
  if (payload?.isAdmin === false) {
    redirect("/");
  }


  
  return (
    <div className=" flex items-start   overflow-hidden">
      <AdminSidebar />

      <main className="w-full">{children}</main>
    </div>
  );
}
