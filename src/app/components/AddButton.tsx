"use client";

import { NormalizedArtwork } from "@/models/normalizedSchema";
import { useEffect, useState } from "react";

type Props = {
  artwork: NormalizedArtwork;
};

export default function AddButton({ artwork }: Props) {
  const [collection, setCollection] = useState<NormalizedArtwork[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collection = localStorage.getItem("collection") || "[]";
    const parsedCollection: NormalizedArtwork[] = JSON.parse(collection);
    setCollection(parsedCollection);
  }, []);

  function saveToLocalStorage() {
    setSubmitting(true);

    const alreadyInCollection = collection.some(
      (item) => item.id === artwork.id
    );

    if (alreadyInCollection) {
      setError("Artwork is already in the collection");
      setSubmitting(false);
      return;
    }

    const updatedCollection = [...collection, artwork];
    localStorage.setItem("collection", JSON.stringify(updatedCollection));
    setCollection(updatedCollection);
  }

  return (
    <div>
      {error && (
        <div className="bg-red-300 text-white p-2 rounded mb-4">{error}</div>
      )}
      {!error && (
        <button
          onClick={saveToLocalStorage}
          disabled={submitting}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            submitting ? "cursor-default opacity-50 text-white bg-blue-500" : ""
          }`}
        >
          {submitting ? "Added" : "Add to collection"}
        </button>
      )}
    </div>
  );
}
