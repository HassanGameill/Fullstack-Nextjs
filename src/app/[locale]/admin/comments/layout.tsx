
import React, { ReactNode } from "react";

interface IAdmin {
  children: ReactNode;
}

export default function AdminCommentsLayout({ children }: IAdmin) {



  
  return (
    <div className="pt-20">
     

      <main className="w-full">{children}</main>
    </div>
  );
}
