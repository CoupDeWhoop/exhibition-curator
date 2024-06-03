import type { SingleArtworkResultComplete } from "@/models/Images";
import { singleArtworkResponseCompleteSchema } from "@/models/Images";

export default async function fetchSingleArtwork(
  imageId: string
): Promise<SingleArtworkResultComplete | undefined> {
  try {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks/${imageId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch artwork");
    }

    const artworkResult = await res.json();
    const parsedData = singleArtworkResponseCompleteSchema.parse(artworkResult);

    if (!parsedData.data) {
      return undefined;
    }

    return parsedData;
  } catch (e) {
    console.error("Error fetching artwork:", e);
  }
}
