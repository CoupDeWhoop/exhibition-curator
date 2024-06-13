"use client";

import { useState } from "react";
import Image from "next/image";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";
import { chooseLoader } from "./ImgContainer";

type Props = {
  artworks: NormalizedArtwork[];
  currentIndex: number;
  onClose: () => void;
};

export default function ArtworkModal({
  artworks,
  currentIndex,
  onClose,
}: Props) {
  const [current, setCurrent] = useState(currentIndex);

  const nextArtwork = () => {
    setCurrent((prev) => (prev + 1) % artworks.length);
  };

  const prevArtwork = () => {
    setCurrent((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const currentArtwork = artworks[current];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative p-4 max-w-4xl w-full h-full overflow-hidden">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-between">
          <button className="text-white text-2xl p-4" onClick={prevArtwork}>
            &larr;
          </button>
          <div className="flex-grow text-center">
            <Image
              loader={chooseLoader(currentArtwork.museum)}
              src={currentArtwork.imageUrl || PLACEHOLDER_IMAGE_URL}
              alt={currentArtwork.altText || currentArtwork.title}
              height={currentArtwork.height}
              width={currentArtwork.width}
              className="w-full h-full max-h-[90vh] object-contain"
            />
            <p className="text-white mt-2">{currentArtwork.title}</p>
          </div>
          <button className="text-white text-2xl p-4" onClick={nextArtwork}>
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
