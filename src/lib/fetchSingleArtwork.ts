import type { ChicagoArtworksResults } from "@/models/chicagoSchemas";
import { normalizeItem } from "./normalizeData";
import {
  NormalizedArtworksResults,
  normalizedResponseSchema,
} from "@/models/normalizedSchema";

export default async function fetchSingleArtwork(
  imageId: string
): Promise<NormalizedArtworksResults | undefined> {
  try {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks/${imageId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch artwork");
    }

    const artworkResult: ChicagoArtworksResults = await res.json();

    if (artworkResult.data && !Array.isArray(artworkResult.data)) {
      const normalizedData = {
        ...artworkResult,
        data: normalizeItem(artworkResult.data, "chicago"),
      };
      const parsedData = normalizedResponseSchema.parse(normalizedData);

      if (!parsedData.data) {
        return undefined;
      }

      return parsedData;
    } else {
      console.error("Expected single artwork object, received array.");
      return undefined;
    }
  } catch (e) {
    console.error("Error fetching artwork:", e);
  }
}
