"use client";

import { NormalizedArtwork } from "@/models/normalizedSchema";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type Props = {
  setCollectionUpdated: Dispatch<SetStateAction<number>>;
};

export default function ClearButton({ setCollectionUpdated }: Props) {
  const [collection, setCollection] = useState<NormalizedArtwork[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let parsedCollection;

    const localCollection = localStorage.getItem("collection") || "[]";
    parsedCollection = JSON.parse(localCollection);
    setCollection(parsedCollection);
  }, []);

  function clearLocalStorage() {
    setSubmitting(true);
    localStorage.removeItem("collection");
    setCollection([]);
    setCollectionUpdated((n: number) => n + 1);
    setSubmitting(false);
    setError(null);
  }

  return (
    <div className="-center">
      {error && (
        <div className="bg-red-300 text-white p-2 rounded mb-4">{error}</div>
      )}
      {!error && collection.length > 0 && (
        <button
          onClick={clearLocalStorage}
          disabled={submitting}
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            submitting ? "cursor-wait opacity-50" : ""
          }`}
        >
          {submitting ? "Deleting..." : "Clear collection"}
        </button>
      )}
    </div>
  );
}
