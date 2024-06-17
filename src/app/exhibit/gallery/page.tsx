"use client";
import { Suspense, useEffect, useState } from "react";
import ClearButton from "@/app/components/ClearExhibit";
import ArtworkModal from "@/app/components/ModalGallery";
import ImgContainer from "@/app/components/ImgContainer";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import Loading from "@/app/loading";

export default function Exhibit() {
  const [museumCollection, setMuseumCollection] = useState<
    NormalizedArtwork[] | null
  >(null);

  const [cleared, setCleared] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const collection = localStorage.getItem("collection") || "[]";
    const parsedCollection = JSON.parse(collection);
    setMuseumCollection(parsedCollection);
  }, [cleared]);

  const openModal = () => {
    if (currentIndex === -1) setCurrentIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="pb-10 px-4 ">
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col sm:flex-row items-center sm:gap-8 px-4 sm:justify-between">
          <p className="text-2xl sm:text-3xl text-gray-500 py-6">
            {museumCollection && museumCollection.length > 0
              ? "Your beautifully curated exhibition, well done you!"
              : "Works added to your collection will appear here. 🖼️"}
          </p>
          <button
            onClick={openModal}
            className={
              "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border whitespace-nowrap border-blue-500 hover:border-transparent rounded"
            }
          >
            Open slideshow
          </button>
        </div>
        <div className="grid grid-cols-gallery">
          {museumCollection &&
            museumCollection.map((artwork, index) => (
              <ImgContainer
                artwork={artwork}
                museum={artwork.museum}
                link={`gallery/${artwork.museum}/${artwork.id}`}
                index={index}
                key={`${artwork.museum}-${artwork.id}`}
              />
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
      </Suspense>
    </section>
  );
}
