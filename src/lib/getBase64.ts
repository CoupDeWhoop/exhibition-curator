import { getPlaiceholder } from "plaiceholder";
import { chicagoConfig } from "../../chicagoApi.config";
import {
  NormalizedArtwork,
  NormalizedArtworksResults,
} from "@/models/normalizedSchema";

const sampleImageUrl =
  "https://www.artic.edu/iiif/2/16cc6197-6bd1-669d-a94f-b46908b9affa/full/677,/0/default.jpg";

function getFullUrl(imageUrl: string | undefined | null, museum: string) {
  if (!imageUrl || imageUrl === "/images/no-image.png") {
    // chose random image for blur to get round blurring local image
    return sampleImageUrl;
  }
  if (museum === "chicago") {
    return `${chicagoConfig.IIIF_URL}${imageUrl}`;
  }
  if (museum === "harvard") {
    return imageUrl;
  }
  return sampleImageUrl;
}

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl, {
      // no key is needed for Chicago API but was giving a 403 without this.
      // headers: {
      //   "User-Agent":
      //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
      //   "Access-Control-Allow-Origin": "*",
      // },
    });

    if (!res.ok)
      throw new Error(
        `Failed to fetch image: ${res.status} ${res.statusText} ${imageUrl}`
      );

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export default async function addBlurredDataUrls(
  artworks: NormalizedArtworksResults,
  museum: string
): Promise<NormalizedArtwork[] | NormalizedArtwork> {
  // Make all requests at once instead of awaiting each one - avoiding a waterfall
  if (Array.isArray(artworks.data)) {
    const base64Promises = artworks.data.map((artwork) => {
      const url = getFullUrl(artwork.imageUrl, museum);
      return getBase64(url);
    });

    const base64Results = await Promise.all(base64Promises);

    const photosWithBlur: NormalizedArtwork[] = artworks.data.map(
      (artwork, index) => {
        artwork.blurredDataUrl = base64Results[index]; // Fulfilled promises keep the same order
        return artwork;
      }
    );

    return photosWithBlur;
  } else if (artworks.data) {
    // single artwork
    const { data } = artworks;
    const url = getFullUrl(data.imageUrl, museum);
    const base64 = await getBase64(url);
    data.blurredDataUrl = base64;

    return data;
  } else {
    // no data
    throw new Error("unable to read photo data");
  }
}
