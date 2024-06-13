// /src/app/components/exhibit.tsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ClearButton from "@/app/components/ClearExhibit";
import ArtworkModal from "@/app/components/ModalGallery";
import { chooseLoader } from "@/app/components/ImgContainer";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";

export default function Exhibit() {
  const [museumCollection, setMuseumCollection] = useState<
    NormalizedArtwork[] | null
  >(null);

  const [cleared, setCleared] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const collection = localStorage.getItem("collection") || "[]";
    const parsedCollection = JSON.parse(collection);
    setMuseumCollection(parsedCollection);
  }, [cleared]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="pb-10">
      <p className="text-2xl sm:text-3xl px-10 sm:px-5 text-gray-500 pt-10 md:max-w-[70%]">
        {museumCollection && museumCollection.length > 0
          ? "Your beautifully curated exhibition, well done you!"
          : "nothing to see yet"}
      </p>
      <div className="flex flex-wrap gap-4">
        {museumCollection &&
          museumCollection.map((artwork, index) => (
            <div key={`${artwork.museum}-${artwork.id}`} className="flex-1 ">
              <div
                onClick={() => openModal(index)}
                className="cursor-pointer min-w-[250px] max-w-[450px] border-black border-2"
              >
                <Image
                  loader={chooseLoader(artwork.museum)}
                  src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
                  alt={artwork.altText || artwork.title}
                  height={artwork.height}
                  width={artwork.width}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center pt-6">
        <ClearButton setCleared={setCleared} />
      </div>
      {modalOpen && museumCollection && (
        <ArtworkModal
          artworks={museumCollection}
          currentIndex={currentIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
