"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const museumMatch = pathname.match(/\w+/)?.[0];
    const basePath = pathname === "/" ? "chicago" : museumMatch ?? "";

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
        placeholder="Search"
        className="bg-white py-2 px-3 w-[260px] sm:w-80 text-xl rounded-xl text-black"
      />
    </form>
  );
}
