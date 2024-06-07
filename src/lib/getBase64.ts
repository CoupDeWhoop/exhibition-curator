import { getPlaiceholder } from "plaiceholder";
import { chicagoConfig } from "../../chicagoApi.config";
import {
  NormalizedArtwork,
  NormalizedArtworksResults,
} from "@/models/normalizedSchema";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl, {
      // no key is needed for Chicago API but was giving a 403 without this. it is a static image url
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!res.ok)
      throw new Error(
        `Failed to fetch image: ${res.status} ${res.statusText} ${imageUrl}`
      );

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    // console.log(base64);

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export default async function addBlurredDataUrls(
  artworks: NormalizedArtworksResults
): Promise<NormalizedArtwork[]> {
  let base64Promises;
  // Make all requests at once instead of awaiting each one - avoiding a waterfall
  if (Array.isArray(artworks.data)) {
    base64Promises = artworks.data.map((artwork) => {
      if (!artwork.imageUrl || artwork.imageUrl === "/images/no-image.png") {
        // chose random image for blur to get round blurring local image
        return getBase64(
          "https://www.artic.edu/iiif/2/16cc6197-6bd1-669d-a94f-b46908b9affa/full/677,/0/default.jpg"
        );
      } else if (artwork.imageUrl.startsWith("https://nrs.harvard.edu/")) {
        return getBase64(artwork.imageUrl);
      } else {
        return getBase64(`${chicagoConfig.IIIF_URL}${artwork.imageUrl}`);
      }
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
    const artwork = artworks.data;
    let base64;

    if (artwork.imageUrl === "/images/no-image.png") {
      base64 = await getBase64(
        "https://www.artic.edu/iiif/2/16cc6197-6bd1-669d-a94f-b46908b9affa/full/677,/0/default.jpg"
      );
    } else {
      base64 = await getBase64(`${chicagoConfig.IIIF_URL}${artwork.imageUrl}`);
    }

    artwork.blurredDataUrl = base64;

    return [artwork];
  } else {
    // no data
    return [];
  }
}
