"use client";
import { josefin } from "../fonts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MuseumSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const searchQuery = pathname.split("/")[3];
    if (searchQuery) setSearchQuery(searchQuery);
    if (pathname === "/") setSearchQuery("");
  }, [pathname]);

  return (
    <section className="max-w-7xl px-4 mx-auto py-6 border-b-[1px] border-gray-200">
      <nav className={josefin.className}>
        <ul className="flex flex-col md:flex-row gap-2 items-center text-xl xs:whitespace-nowrap sm:text-2xl uppercase">
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              pathname.split("/")[1] === "chicago"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            }`}
          >
            <Link
              href={
                searchQuery
                  ? `/chicago/results/${searchQuery}`
                  : `/chicago/gallery`
              }
            >
              Art Institute Chicago
            </Link>
          </li>
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              pathname.split("/")[1] === "harvard"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            } `}
          >
            <Link
              href={
                searchQuery
                  ? `/harvard/results/${searchQuery}`
                  : `/harvard/gallery`
              }
            >
              Harvard art museum
            </Link>
          </li>
          <li
            className={`p-2 ${
              pathname.split("/")[1] === "exhibit"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            } `}
          >
            <Link href="/exhibit/gallery">My Exhibition</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
