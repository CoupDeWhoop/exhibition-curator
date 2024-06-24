"use client";
import { Suspense, useEffect, useState } from "react";
import ClearButton from "@/app/components/exhibit/ClearExhibit";
import ArtworkModal from "@/app/components/exhibit/ModalGallery";
import ImgContainer from "@/app/components/Gallery/ImgContainer";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import Loading from "@/app/loading";

export default function Exhibit() {
  const [museumCollection, setMuseumCollection] = useState<
    NormalizedArtwork[] | null
  >(null);

  const [cleared, setCleared] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(false);
  const [photoToMove, setPhotoToMove] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const collection = localStorage.getItem("collection") || "[]";
    const parsedCollection = JSON.parse(collection);
    setMuseumCollection(parsedCollection);
  }, [cleared, photoToMove]);

  const handleEditButtonClick = () => {
    if (editingOrder) {
      setPhotoToMove(null);
      setEditingOrder(false);
    } else {
      setEditingOrder(true);
    }
  };

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
              : "Works added to your collection will appear here."}
          </p>

          {museumCollection && museumCollection.length > 0 && (
            <button
              onClick={openModal}
              disabled={museumCollection?.length === 0}
              className={
                "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border whitespace-nowrap border-blue-500 hover:border-transparent rounded"
              }
            >
              Open slideshow
            </button>
          )}
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
                editingOrder={editingOrder}
                setEditingOrder={setEditingOrder}
                photoToMove={photoToMove}
                setPhotoToMove={setPhotoToMove}
                museumCollection={museumCollection}
              />
            ))}
        </div>
        <div className="flex justify-center gap-4 pt-6">
          <div className={`${editingOrder ? "collapse" : ""}`}>
            <ClearButton setCleared={setCleared} />
          </div>
          <button
            onClick={handleEditButtonClick}
            className={` hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
              ${editingOrder ? "bg-blue-500 text-white" : "bg-transparent"}`}
          >
            {editingOrder ? "Done" : "Edit order"}
          </button>
          {editingOrder && (
            <div
              className="fixed flex gap-2 items-center md:left-44 bottom-24 md:bottom-11
              bg-white p-2 border rounded z-50"
            >
              <p className="">Click to choose photo. Click again to insert</p>
              <button
                className="font-bold text-blue-700 border-blue-500 hover:bg-blue-500 border p-1 hover:border-transparent rounded hover:text-white "
                onClick={handleEditButtonClick}
              >
                Done
              </button>
            </div>
          )}
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
