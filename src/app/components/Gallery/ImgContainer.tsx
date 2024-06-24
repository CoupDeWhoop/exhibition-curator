"use client";
import Image from "next/image";
import { chicagoImageLoader, harvardImageLoader } from "../../../lib/loader";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  artwork: NormalizedArtwork;
  museumCollection?: NormalizedArtwork[] | null;
  museum: string;
  link: string;
  index: number;
  editingOrder?: boolean;
  setEditingOrder?: Dispatch<SetStateAction<boolean>>;
  setCollectionUpdated?: Dispatch<SetStateAction<number>>;
};

export function chooseLoader(museum: string) {
  switch (museum) {
    case "chicago":
      return chicagoImageLoader;
    case "harvard":
      return harvardImageLoader;
  }
}

export default function ImgContainer({
  artwork,
  museumCollection,
  museum,
  editingOrder,
  setEditingOrder,
  setCollectionUpdated,
  link,
  index,
}: Props) {
  const [photoToMove, setPhotoToMove] = useState<number | null>(null);
  const ArtworkImage = () => {
    return (
      <div className="group relative">
        <div
          className={`${
            index === photoToMove ? "bg-green-400 border-red-500 border-4" : ""
          }`}
        >
          <Image
            loader={chooseLoader(museum)}
            src={artwork.imageUrl}
            alt={artwork.altText || artwork.title}
            height={artwork.height}
            width={artwork.width}
            sizes="(min-width: 1360px) 272px, (min-width: 1100px) calc(18.75vw + 21px), (min-width: 840px) calc(33.33vw - 48px), (min-width: 560px) calc(50vw - 48px), calc(100vw - 48px)"
            className={`w-full h-full max-h-[600px] object-contain group-hover:opacity-75 ${
              editingOrder ? "opacity-40" : ""
            } `}
          />
          {editingOrder && (
            <div className="absolute top-10 right-10  text-red-400 ">
              <p className="text-4xl">{index + 1}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleEditCollection = () => {
    if (!editingOrder || !museumCollection || !setCollectionUpdated) return;

    if (!photoToMove) {
      setPhotoToMove(index);
    } else {
      const newOrder = [...museumCollection];
      const removed = newOrder.splice(photoToMove, 1);
      newOrder.splice(index, 0, ...removed);
      localStorage.setItem("collection", JSON.stringify(newOrder));
      setPhotoToMove(null);
      setCollectionUpdated((n: number) => n + 1);
    }
  };

  const widthHeightRatio = artwork.height / artwork.width;
  const galleryHeight = 250 * widthHeightRatio;
  const photoSpans = Math.ceil(galleryHeight / 10) + 10;

  return (
    <div
      className="pt-10 mx-4 border-b-[1px]"
      style={{ gridRow: `span ${photoSpans}` }}
      onClick={handleEditCollection}
    >
      {editingOrder ? (
        <ArtworkImage />
      ) : (
        <Link href={link}>
          <ArtworkImage />
        </Link>
      )}

      <div className="pt-4 pb-4">
        <h2 className="sm:text-2xl truncate whitespace-normal line-clamp-2">
          {`${artwork.title}${
            artwork.dateDisplay ? `, ${artwork.dateDisplay}` : ""
          }`}
        </h2>

        <p className="sm:text-lg pt-2 text-gray-500 truncate whitespace-normal">
          {artwork.artistTitle ?? artwork.culture}
        </p>
      </div>
    </div>
  );
}
