export type ChicagoConfig = {
  IIIF_URL: string;
};

export let chicagoConfig: ChicagoConfig = {
  IIIF_URL: "https://www.artic.edu/iiif/2",
};

export function updateConfig(newConfig: string) {
  chicagoConfig.IIIF_URL = newConfig;
}
