import { getPlaiceholder } from "plaiceholder";
import type { ArtworkShort, ArtworksResultsShort } from "@/models/Images";
import { chicagoConfig } from "../../chicagoApi.config";

const Base64 =
  "data:image/gif;base64,R0lGODlhCQAFAPUAABggIBwlJRwoKB0oKR0uNRwuOSAmJCooIy8qIy4uJiYrKScvLi0uKDguJTsvJS0wJyM1LzkxJjA0LSQzMC42MSs1NSg7N0MzJkA4K0A+NTFAOzJDPDFCPkFEPytEQzxNSENRSkdWSklcTk1dUVZkVVRqW3aRenmUfKufaH+bgba3h7y8iMG9hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAUAAAYqwMbFgUg8JIuKgkGxcD6kFSsA0HgIhY4KBRqFIIZDJIM5pUwl0WYiGAQBADs=";

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
  artworks: ArtworksResultsShort
): Promise<ArtworkShort[]> {
  // Make all requests at once instead of awaiting each one - avoiding a waterfall
  const base64Promises = artworks.data.map((artwork) => {
    if (artwork.image_path === "/images/no-image.png") {
      // chose random image for blur to get round blurring local image
      return getBase64(
        "https://www.artic.edu/iiif/2/16cc6197-6bd1-669d-a94f-b46908b9affa/full/677,/0/default.jpg"
      );
    } else {
      return getBase64(`${chicagoConfig.IIIF_URL}${artwork.image_path}`);
    }
  });

  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur: ArtworkShort[] = artworks.data.map((artwork, index) => {
    artwork.blurredDataUrl = base64Results[index]; // Fulfilled promises keep the same order

    return artwork;
  });

  return photosWithBlur;
}
