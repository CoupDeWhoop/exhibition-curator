import fetchArtworks from "@/lib/fetchArtworks";
import type { ArtworksResultsShort } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";

import React from "react";

export default async function Gallery() {
  let limit = 83;
  const url =
    "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&limit=" +
    limit.toString();
  // "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id,thumbnail";

  const artworks: ArtworksResultsShort | undefined = await fetchArtworks(url);

  if (!artworks)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(artworks);

  const columns = 4;
  const columnLimit = Math.ceil(photosWithBlur.length / columns);

  // Create an array of arrays to store images for each set of columns
  const columnSets = [];
  for (let i = 0; i < columns; i++) {
    const start = i * columnLimit;
    const end = Math.min(start + columnLimit, photosWithBlur.length);
    columnSets.push(photosWithBlur.slice(start, end));
  }

  return (
    <section className="my-3 flex">
      {columnSets.map((columnSet, setIndex) => (
        <div className=" border-gray-100 px-3 border-r-2 last:border-r-0">
          <div key={`column-${setIndex}`} className="flex-1 gap-2 min-w-0 ">
            {columnSet.map((artwork, index) => (
              <div
                key={`item-${setIndex}-${index}`}
                // className="flex-grow max-w-xs md:max-w-sm flex justify-center"
                className="border-b-2 border-gray-100 last:border-b-0"
              >
                <ImgContainer key={artwork.id} artwork={artwork} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
