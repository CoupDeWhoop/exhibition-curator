import { getPlaiceholder } from "plaiceholder";
import type { ArtworkShort, ArtworksResultsShort } from "@/models/Images";
import { RECOMMENDED_SIZE, IIIF_URL } from "@/lib/fetchArtworks";

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
    return getBase64(`${IIIF_URL}/${artwork.image_id}${RECOMMENDED_SIZE}`);
  });

  // REsolve all requests in orderx
  const base64Results = await Promise.all(base64Promises);

  const photosWithBlur: ArtworkShort[] = artworks.data.map((artwork, index) => {
    artwork.blurredDataUrl = base64Results[index];

    return artwork;
  });

  return photosWithBlur;
}
