"use client";
import Image from "next/image";
import { chicagoImageLoader, harvardImageLoader } from "../../../lib/loader";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  artwork: NormalizedArtwork;
  museumCollection: NormalizedArtwork[] | null;
  museum: string;
  link: string;
  index: number;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  photoToMove: number | null;
  setPhotoToMove: Dispatch<SetStateAction<number | null>>;
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
  editing,
  setEditing,
  photoToMove,
  setPhotoToMove,
  link,
  index,
}: Props) {
  const handleEditCollection = () => {
    if (!editing || !museumCollection) return;

    if (!photoToMove) {
      setPhotoToMove(index);
    } else {
      const newOrder = [...museumCollection];
      const removed = newOrder.splice(photoToMove);
      newOrder.splice(index, 0, ...removed);
      localStorage.setItem("collection", JSON.stringify(newOrder));
      setPhotoToMove(null);
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
      <Link href={editing ? "" : link}>
        <div className="group relative">
          <Image
            loader={chooseLoader(museum)}
            src={artwork.imageUrl}
            alt={artwork.altText || artwork.title}
            height={artwork.height}
            width={artwork.width}
            sizes="(min-width: 1360px) 272px, (min-width: 1100px) calc(18.75vw + 21px), (min-width: 840px) calc(33.33vw - 48px), (min-width: 560px) calc(50vw - 48px), calc(100vw - 48px)"
            // placeholder="blur"
            // blurDataURL={artwork.blurredDataUrl}
            className={` w-full h-full max-h-[600px] object-contain group-hover:opacity-75 ${
              editing ? "opacity-10" : ""
            }`}
          />
          {editing && (
            <p className="absolute top-10 right-10 font-bold text-red-400">
              Click to choose photo. <br /> Click again to move
            </p>
          )}
        </div>

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
      </Link>
    </div>
  );
}
