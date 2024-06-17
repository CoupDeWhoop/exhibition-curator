"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const museumMatch = pathname.split("/")[1];
  const basePath = pathname === "/" ? "chicago" : museumMatch ?? "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/${basePath}/results/${search}`);
    setSearch("");
  };

  return (
    <form
      className="flex justify-center md:justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${
          museumMatch === "exhibit" || !museumMatch
            ? "Chicago"
            : museumMatch[0].toUpperCase() + museumMatch.slice(1)
        }`}
        className="bg-white py-2 px-3 max-w-[95vw] w-[280px] xs:w-[200px] md:w-[260px] text-xl rounded-xl text-black"
      />
    </form>
  );
}
