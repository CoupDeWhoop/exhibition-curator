// /src/app/components/exhibit.tsx

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ClearButton from "@/app/components/ClearExhibit";
import ArtworkModal from "@/app/components/ModalGallery";
import ImgContainer, { chooseLoader } from "@/app/components/ImgContainer";
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
  //border-2 border-blue-500

  return (
    <section className="pb-10 px-6 ">
      <p className="text-2xl sm:text-3xl  text-gray-500 py-6 md:max-w-[70%]">
        {museumCollection && museumCollection.length > 0
          ? "Your beautifully curated exhibition, well done you!"
          : "Add something to your collection. 🖼️"}
      </p>
      <div className="grid grid-cols-gallery">
        {museumCollection &&
          museumCollection.map(
            (artwork, index) => (
              <ImgContainer
                artwork={artwork}
                museum={artwork.museum}
                link={"/"}
              />
            )
            // <div
            //   key={`${artwork.museum}-${artwork.id}`}
            //   // className="flex-grow basis-[calc(33%-1rem)] max-w-[calc(33%-1rem)]"
            //   className="flex-grow"
            // >
            //   <div
            //     onClick={() => openModal(index)}
            //     className="cursor-pointer border-black border-2"
            //   >
            //     <Image
            //       loader={chooseLoader(artwork.museum)}
            //       src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
            //       alt={artwork.altText || artwork.title}
            //       height={artwork.height}
            //       width={artwork.width}
            //       placeholder="blur"
            //       blurDataURL={artwork.blurredDataUrl}
            //       className="h-full w-full object-contain"
            //     />
            //   </div>
            // </div>
          )}
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
