"use client";

import { useState } from "react";
import Image from "next/image";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import { chooseLoader } from "../Gallery/ImgContainer";

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
    <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
      <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-center h-full w-full">
          {/* image and arrows */}
          <button
            className="text-white text-2xl p-4 h-full"
            onClick={prevArtwork}
          >
            &larr;
          </button>
          <div className="flex-grow text-center flex flex-col p-10 items-center justify-center h-full max-h-full">
            <div className="flex-grow flex items-center justify-center max-h-full">
              <Image
                loader={chooseLoader(currentArtwork.museum)}
                src={currentArtwork.imageUrl}
                alt={currentArtwork.altText || currentArtwork.title}
                height={currentArtwork.height}
                width={currentArtwork.width}
                placeholder="blur"
                blurDataURL={currentArtwork.blurredDataUrl}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white text-2xl mt-2">{currentArtwork.title}</p>
          </div>
          <button
            className="text-white text-2xl p-4 h-full"
            onClick={nextArtwork}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
