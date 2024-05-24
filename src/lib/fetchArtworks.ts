import type { ArtworksResultsShort } from "@/models/Images";
import { apiResponseShortSchema } from "@/models/Images";

export let IIIF_URL: string = "";

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

    // runs on server not browser
    // console.log(artworksResults);

    // Parse data with Zod schema
    const parsedData = apiResponseShortSchema.parse(artworksResults);

    if (parsedData.data.length === 0) return undefined;

    //dynamically aquire the images API url
    if (parsedData.config.iiif_url) {
      IIIF_URL = parsedData.config.iiif_url;
    } else {
      // just in case
      IIIF_URL = "https://www.artic.edu/iiif/2";
    }

    return parsedData;
  } catch (e) {
    // Will show in terminal console
    if (e instanceof Error) console.log(e.stack);
  }
}
