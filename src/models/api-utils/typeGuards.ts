import { ChicagoArtworksResults } from "@/models/museumSchemas";
import { HarvardArtworkResults } from "@/models/harvardSchemas";

export function isChicagoArtworksResults(
  data: any
): data is ChicagoArtworksResults {
  return (data as ChicagoArtworksResults).data !== undefined;
}

export function isHarvardArtworkResults(
  data: any
): data is HarvardArtworkResults {
  return (data as HarvardArtworkResults).records !== undefined;
}
