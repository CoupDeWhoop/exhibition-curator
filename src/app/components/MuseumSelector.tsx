"use client";
import { useEffect, useState } from "react";
import { josefin } from "../fonts";
import { useRouter, usePathname } from "next/navigation";

export default function MuseumSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMuseum) {
      const currentPage = pathname.split("/")[2];
      if (currentPage === "results" && selectedMuseum !== "exhibit") {
        const searchQuery = pathname.split("/")[3];
        router.push(`/${selectedMuseum}/results/${searchQuery}`);
      } else {
        router.push(`/${selectedMuseum}/gallery`);
      }
    }
  }, [selectedMuseum]);

  function handleMuseumSelect(museum: string) {
    setSelectedMuseum(museum);
  }

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
            <input
              type="radio"
              id="chicago"
              name="museumSelector"
              value="chicago"
              checked={selectedMuseum === "chicago"}
              className="opacity-0 absolute "
              onChange={() => {
                handleMuseumSelect("chicago");
              }}
            />
            <label htmlFor="chicago" className="cursor-pointer">
              Art Institute Chicago
            </label>
          </li>
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              pathname.split("/")[1] === "harvard"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            } `}
          >
            <input
              type="radio"
              id="harvard"
              name="museumSelector"
              value="harvard"
              checked={selectedMuseum === "harvard"}
              className="opacity-0 absolute"
              onChange={() => handleMuseumSelect("harvard")}
            />
            <label htmlFor="harvard" className="cursor-pointer">
              Harvard art museum
            </label>
          </li>
          <li
            className={`p-2 ${
              pathname.split("/")[1] === "exhibit"
                ? "md:underline md:outline-none outline underline-offset-[16px]"
                : ""
            } `}
          >
            <input
              type="radio"
              id="exhibit"
              name="museumSelector"
              value="exhibit"
              checked={selectedMuseum === "exhibit"}
              className="opacity-0 absolute"
              onChange={() => handleMuseumSelect("exhibit")}
            />
            <label htmlFor="exhibit" className="cursor-pointer">
              My Exhibition
            </label>
          </li>
        </ul>
      </nav>
    </section>
  );
}
