import { ChicagoArtwork } from "@/models/chicagoSchemas";
import { RECOMMENDED_SIZE } from "./constants";

export default function generateImageUrl(artwork: ChicagoArtwork): string {
  const { image_id, thumbnail } = artwork;
  let imageUrl;

  if (thumbnail && image_id) {
    imageUrl =
      thumbnail.width >= RECOMMENDED_SIZE &&
      thumbnail.height >= RECOMMENDED_SIZE
        ? `/${image_id}/full/${RECOMMENDED_SIZE},/0/default.jpg`
        : `/${image_id}/full/${Math.min(
            thumbnail.width,
            thumbnail.height
          )},/0/default.jpg`;
  } else {
    imageUrl = "/images/no-image.png";
  }
  return imageUrl;
}
