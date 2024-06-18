"use client";
import { josefin } from "../../fonts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MuseumSelector() {
  const [searchQueries, setSearchQueries] = useState({});
  const [searchPages, setSearchPages] = useState({ harvard: "", chicago: "" });

  const pathname = usePathname();
  const [_, museum, route, query, page] = pathname.split("/");

  useEffect(() => {
    if (route === "results") {
      setSearchQueries((prevQueries) => ({
        ...prevQueries,
        [museum]: query,
      }));

      const searchPage = page || "";
      setSearchPages((prevPages) => ({
        ...prevPages,
        [museum]: searchPage,
      }));
    }
    if (pathname === "/") {
      setSearchQueries({});
      setSearchPages({ harvard: "", chicago: "" });
    }
  }, [pathname]);

  return (
    <section className="max-w-7xl px-4 mx-auto py-6 border-b-[1px] border-gray-200">
      <nav className={josefin.className}>
        <ul className="flex flex-col md:flex-row gap-2 items-center text-xl xs:whitespace-nowrap sm:text-2xl uppercase">
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              museum === "chicago"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            }`}
          >
            <Link
              href={
                "chicago" in searchQueries
                  ? `/chicago/results/${searchQueries["chicago"]}/${searchPages["chicago"]}`
                  : `/chicago/gallery`
              }
            >
              Art Institute Chicago
            </Link>
          </li>
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              museum === "harvard"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            } `}
          >
            <Link
              href={
                "harvard" in searchQueries
                  ? `/harvard/results/${searchQueries["harvard"]}/${searchPages["harvard"]}`
                  : `/harvard/gallery`
              }
            >
              Harvard art museum
            </Link>
          </li>
          <li
            className={`p-2 ${
              museum === "exhibit"
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
