import type { ChicagoArtworksResults } from "@/models/museumSchemas";
import {
  NormalizedArtworksResults,
  normalisedResponseSchema,
} from "@/models/normalizedSchema";
import { updateConfig } from "../../chicagoApi.config";
import { normalizeItem } from "./normalizeData";

export default async function fetchArtworks(
  url: string
): Promise<NormalizedArtworksResults | undefined> {
  try {
    const res = await fetch(url, {
      // no key is needed for Chicago API
      headers: { "AIC-User-Agent": "D-Greenland (greenlanddev01@gmail.com)" },
    });

    if (!res.ok) throw new Error("Fetch Images error!\n");

    const artworksResults: ChicagoArtworksResults = await res.json();

    //dynamically aquire the images API url for all
    if (artworksResults.config.iiif_url) {
      updateConfig(artworksResults.config.iiif_url);
    }

    // Normalize the data using normalizeItem function
    const normalizedData = {
      ...artworksResults,
      data: artworksResults.data.map((item) => normalizeItem(item, "chicago")),
    };

    // Validate the normalized data with Zod schema
    const parsedData = normalisedResponseSchema.parse(normalizedData);

    if (!parsedData) return undefined;

    return parsedData;
  } catch (e) {
    // Will show in terminal console
    if (e instanceof Error) console.log(e.stack);
  }
}
