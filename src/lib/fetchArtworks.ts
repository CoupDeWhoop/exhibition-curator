import type { ArtworksResultsShort } from "@/models/Images";
import { apiResponseShortSchema } from "@/models/Images";
import { updateConfig } from "../../chicagoApi.config";

export default async function fetchArtworks(
  url: string
): Promise<ArtworksResultsShort | undefined> {
  try {
    const res = await fetch(url, {
      // no key is needed for Chicago API
      headers: { "AIC-User-Agent": "D-Greenland (greenlanddev01@gmail.com)" },
    });

    if (!res.ok) throw new Error("Fetch Images error!\n");

    const artworksResults: ArtworksResultsShort = await res.json();

    //dynamically aquire the images API url for all
    if (artworksResults.config.iiif_url) {
      updateConfig(artworksResults.config.iiif_url);
    }

    // Parse data with Zod schema
    const parsedData = apiResponseShortSchema.parse(artworksResults);

    if (parsedData.data.length === 0) return undefined;

    return parsedData;
  } catch (e) {
    // Will show in terminal console
    if (e instanceof Error) console.log(e.stack);
  }
}
