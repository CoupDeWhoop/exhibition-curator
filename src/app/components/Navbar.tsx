import Link from "next/link";
import { josefin } from "../fonts";

import React from "react";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="bg-black sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center px-6 py-4 font-bold max-w-7xl mx-auto text-white">
        <h1
          className={`text-3xl sm:text-4xl text-center whitespace-nowrap uppercase ${josefin.className}`}
        >
          <Link href="/">Museum & Gallery</Link>
        </h1>
        <Search />
      </nav>
    </header>
  );
}
