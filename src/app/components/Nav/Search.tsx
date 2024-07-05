"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const museum = pathname.split("/")[1];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!museum || museum === "exhibit") {
      router.push(`/chicago/results/${search}`);
    } else {
      router.push(`/${museum}/results/${search}`);
    }
    setSearch("");
  };

  // to handle autocomplete in search box
  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
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
        onInput={handleInput}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${
          museum === "exhibit" || !museum
            ? "Chicago"
            : museum[0].toUpperCase() + museum.slice(1)
        }`}
        className="bg-white py-2 px-3 max-w-[95vw] w-[280px] xs:w-[200px] md:w-[260px] text-xl rounded-xl text-black"
      />
    </form>
  );
}
