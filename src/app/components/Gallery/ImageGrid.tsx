import ImgContainer from "@/app/components/Gallery/ImgContainer";
import { NormalizedArtwork } from "@/models/normalizedSchema";

type Props = {
  data: NormalizedArtwork[] | NormalizedArtwork;
};

export default async function ImageGrid({ data }: Props) {
  return (
    <section className="grid grid-cols-gallery min-w-1">
      {Array.isArray(data) &&
        data.map((artwork, index) => (
          <ImgContainer
            key={artwork.id}
            artwork={artwork}
            museum={artwork.museum}
            link={`/${artwork.museum}/artwork/${artwork.id}`}
            index={index}
          />
        ))}
    </section>
  );
}
