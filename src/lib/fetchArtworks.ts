import type { ChicagoArtworksResults } from "@/models/museumSchemas";
import {
  NormalizedArtworksResults,
  normalisedResponseSchema,
} from "@/models/normalizedSchema";
import { updateConfig } from "../../chicagoApi.config";
import { extractApiData, normalizeItem } from "./normalizeData";
import { HarvardArtworkResults } from "@/models/harvardSchemas";
import {
  isChicagoArtworksResults,
  isHarvardArtworkResults,
} from "@/models/api-utils/typeGuards";

export default async function fetchArtworks(
  url: string,
  museum: string
): Promise<NormalizedArtworksResults | undefined> {
  try {
    const res = await fetch(url, {
      // no key is needed for Chicago API
      headers: { "AIC-User-Agent": "D-Greenland (greenlanddev01@gmail.com)" },
    });

    if (!res.ok) throw new Error("Fetch Images error!\n");

    const artworksResults: ChicagoArtworksResults | HarvardArtworkResults =
      await res.json();

    //dynamically aquire the images API url for all
    if (museum === "chicago" && isChicagoArtworksResults(artworksResults)) {
      updateConfig(artworksResults.config.iiif_url);
    }

    const extractedData = extractApiData(artworksResults, museum);
    const normalizedData = {
      data: extractedData.map((item) => {
        return normalizeItem(item, museum);
      }),
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
