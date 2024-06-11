"use client";
import { useEffect, useState } from "react";
import { josefin } from "../fonts";
import { useRouter } from "next/navigation";

export default function MuseumSelector() {
  const router = useRouter();

  const [selectedMuseum, setSelectedMuseum] = useState<string | null>(null);
  useEffect(() => {
    if (selectedMuseum) {
      router.push(`/${selectedMuseum}/gallery`);
    }
  }, [selectedMuseum]);

  function handleMuseumSelect(museum: string) {
    setSelectedMuseum(museum);
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 border-b-[1px] border-gray-200">
      <nav className={josefin.className}>
        <ul className="flex flex-col gap-2 items-center md:flex-row text-xl whitespace-nowrap sm:text-2xl uppercase">
          <li
            className={`md:border-black p-2 md:pr-6 md:border-r-[1px] ${
              !selectedMuseum || selectedMuseum === "chicago"
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
            className={`p-2 ${
              selectedMuseum === "harvard"
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
        </ul>
      </nav>
    </section>
  );
}
