import {
  chicagoApiResponseSchema,
  ChicagoArtworksResults,
} from "@/models/chicagoSchemas";
import {
  harvardApiResponseSchema,
  HarvardArtworkResults,
} from "@/models/harvardSchemas";

export function isChicagoArtworksResults(
  data: any
): data is ChicagoArtworksResults {
  return chicagoApiResponseSchema.safeParse(data).success;
}

export function isHarvardArtworkResults(
  data: any
): data is HarvardArtworkResults {
  return harvardApiResponseSchema.safeParse(data).success;
}

// started off like this https://www.typescriptlang.org/docs/handbook/advanced-types.html
