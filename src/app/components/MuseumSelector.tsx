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
    <section className="max-w-7xl mx-auto p-4 border-b-[1px] border-gray-200">
      <p className="text-2xl sm:text-3xl text-gray-500 pb-8 sm:max-w-[70%]">
        Explore artworks from a growing collection of artworks and objects from
        different museums around the world.
      </p>
      <nav className={josefin.className}>
        <ul className="flex flex-col md:flex-row text-xl sm:text-2xl uppercase">
          <li
            className={`border-black pr-6 border-r-[1px] ${
              selectedMuseum === "chicago"
                ? "underline underline-offset-[16px]"
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
            className={`px-6 ${
              selectedMuseum === "harvard"
                ? "underline underline-offset-[16px]"
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
