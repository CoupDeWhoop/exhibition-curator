import fetchArtworks from "@/lib/fetchArtworks";
import type { ArtworksResultsShort } from "@/models/Images";

import React from "react";

export default async function Gallery() {
  const url =
    "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id&limit=15";

  const artworks: ArtworksResultsShort | undefined = await fetchArtworks(url);

  if (!artworks)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  return (
    <section>
      <ul>
        {artworks.data.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </section>
  );
}
