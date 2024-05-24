import fetchArtworks from "@/lib/fetchArtworks";
import type { ArtworksResultsShort } from "@/models/Images";
import ImgContainer from "./ImgContainer";

import React from "react";

export default async function Gallery() {
  let limit = 83;
  const url =
    "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail&limit=" +
    limit.toString();
  // "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id,thumbnail";

  const artworks: ArtworksResultsShort | undefined = await fetchArtworks(url);

  if (!artworks)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  const columns = 4;
  const columnLimit = Math.ceil(artworks.data.length / columns);

  // Create an array of arrays to store images for each set of columns
  const columnSets = [];
  for (let i = 0; i < columns; i++) {
    const start = i * columnLimit;
    const end = Math.min(start + columnLimit, artworks.data.length);
    columnSets.push(artworks.data.slice(start, end));
  }

  return (
    <section className="px-2 my-3 flex gap-2 border-2">
      {columnSets.map((columnSet, setIndex) => (
        <div key={setIndex} className="flex-col gap-2">
          {columnSet.map((artwork, index) => (
            <div
              key={index}
              // className="flex-grow max-w-xs md:max-w-sm flex justify-center"
              className=""
            >
              <ImgContainer artwork={artwork} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
