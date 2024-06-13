import type { ChicagoArtworksResults } from "@/models/chicagoSchemas";
import { extractApiData, normalizeData, normalizeItem } from "./normalizeData";
import {
  NormalizedArtworksResults,
  normalizedItemSchema,
} from "@/models/normalizedSchema";
import { HarvardArtworkResults } from "@/models/harvardSchemas";

export default async function fetchSingleArtwork(
  imageId: string,
  museum: string
): Promise<NormalizedArtworksResults | undefined> {
  let res;
  try {
    switch (museum) {
      case "chicago":
        res = await fetch(`https://api.artic.edu/api/v1/artworks/${imageId}`);
        break;
      case "harvard":
        res = await fetch(
          `https://api.harvardartmuseums.org/object/${imageId}?apikey=${process.env.HARVARD_ACCESS_KEY}`
        );
        break;
      default:
        throw new Error("unknown source");
    }

    if (!res.ok) {
      throw new Error("Failed to fetch artwork");
    }

    const artworkResult: ChicagoArtworksResults | HarvardArtworkResults =
      await res.json();

    const { data } = extractApiData(artworkResult);

    const normalizedData = normalizeData(data, museum);

    const parsedData = normalizedItemSchema.parse(normalizedData);

    if (!Array.isArray(parsedData)) {
      return { data: parsedData };
    } else {
      console.error("Expected single artwork object, received array.");
      return undefined;
    }
  } catch (e) {
    console.error("Error fetching artwork:", e);
  }
}
