import Link from "next/link";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/">
        <li>Home</li>
        </Link>
      </nav>
      {children}
    </div>
  );
}

export default Layout;