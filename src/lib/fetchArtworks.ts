import type { ChicagoArtworksResults } from "@/models/chicagoSchemas";
import {
  NormalizedArtworksResults,
  normalizedResponseSchema,
} from "@/models/normalizedSchema";
import { updateConfig } from "../../chicagoApi.config";
import {
  extractApiData,
  normalizeData,
  normalizeItem,
  normalizePagination,
} from "./normalizeData";
import { HarvardArtworkResults } from "@/models/harvardSchemas";
import {
  isChicagoArtworksResults,
  isHarvardArtworkResults,
} from "@/models/typeGuards";

export default async function fetchArtworks(
  url: string,
  museum: string
): Promise<NormalizedArtworksResults | undefined> {
  try {
    const res = await fetch(url, {
      // requested by chicago api on docs
      headers: { "AIC-User-Agent": `${process.env.DEV_EMAIL}` },
    });

    if (!res.ok) throw new Error("Fetch Images error!\n");

    const artworksResults: ChicagoArtworksResults | HarvardArtworkResults =
      await res.json();

    //dynamically aquire the images API url for all
    if (museum === "chicago" && isChicagoArtworksResults(artworksResults)) {
      updateConfig(artworksResults.config.iiif_url);
    }

    const extractedData = extractApiData(artworksResults);

    const normalizedData = normalizeData(extractedData.data, museum);

    const normalizedResponse = {
      data: normalizedData,
      pagination: extractedData.pagination
        ? normalizePagination(extractedData.pagination, museum)
        : null,
    };

    const parsedData = normalizedResponseSchema.parse(normalizedResponse);

    if (!parsedData) return undefined;

    return parsedData;
  } catch (e) {
    // Will show in terminal console
    if (e instanceof Error) console.log(e.stack);
  }
}
