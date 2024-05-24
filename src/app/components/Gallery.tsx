import fetchArtworks from "@/lib/fetchArtworks";
import type { ArtworksResultsShort } from "@/models/Images";
import ImgContainer from "./ImgContainer";

import React from "react";

export default async function Gallery() {
  const url =
    "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail&limit=15";
  // "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id,thumbnail";

  const artworks: ArtworksResultsShort | undefined = await fetchArtworks(url);

  if (!artworks)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  return (
    // grid-cols-gallery is an extension in tailwind.config.ts
    <section className="px-2 my-3 grid gap-2 grid-cols-gallery">
      {artworks.data.map((artwork) => (
        <ImgContainer artwork={artwork} />
      ))}
    </section>
  );
}
