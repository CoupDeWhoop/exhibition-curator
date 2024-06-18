import { ChicagoArtwork } from "@/models/chicagoSchemas";
import { RECOMMENDED_SIZE } from "./constants";

export default function generateImageUrl(artwork: ChicagoArtwork): string {
  //implemented this as some pictures were not high resolution enough in chicago api causing crash

  const { image_id, thumbnail } = artwork;
  if (thumbnail && image_id) {
    if (thumbnail.width === 0 || thumbnail.height === 0)
      return "/images/no-image.png";
    const imageUrl =
      thumbnail.width >= RECOMMENDED_SIZE &&
      thumbnail.height >= RECOMMENDED_SIZE
        ? `/${image_id}/full/${RECOMMENDED_SIZE},/0/default.jpg`
        : `/${image_id}/full/${Math.min(
            thumbnail.width,
            thumbnail.height
          )},/0/default.jpg`;
    return imageUrl;
  } else {
    return "/images/no-image.png";
  }
}
