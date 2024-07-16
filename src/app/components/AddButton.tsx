"use client";

import { NormalizedArtwork } from "@/models/normalizedSchema";
import { useEffect, useState } from "react";

type Props = {
  artwork: NormalizedArtwork;
};

export default function AddButton({ artwork }: Props) {
  const [collection, setCollection] = useState<NormalizedArtwork[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCollection = localStorage.getItem("collection") || "[]";
    const parsedCollection: NormalizedArtwork[] = JSON.parse(storedCollection);
    setCollection(parsedCollection);

    if (parsedCollection.some((item) => item.id === artwork.id)) {
      setSubmitted(true);
    }
  }, [artwork]);

  function saveToLocalStorage() {
    setSubmitted(true);

    if (collection.some((item) => item.id === artwork.id)) {
      setError("Artwork is already in the collection");
      return;
    }

    const updatedCollection = [...collection, artwork];
    localStorage.setItem("collection", JSON.stringify(updatedCollection));
    setCollection(updatedCollection);
  }

  return (
    <div className="text-center pb-10">
      {error && (
        <div className="bg-red-300 text-white p-2 rounded mb-4">{error}</div>
      )}
      {!error && (
        <button
          onClick={saveToLocalStorage}
          disabled={submitted}
          className={` mx-auto font-semibold py-2 px-4   rounded ${
            submitted
              ? "cursor-default opacity-50 text-white bg-blue-500"
              : " hover:bg-blue-500 text-blue-700  hover:text-white hover:border-transparent bg-transparent border border-blue-500"
          }`}
        >
          {submitted ? "Added" : "Add to collection"}
        </button>
      )}
    </div>
  );
}
