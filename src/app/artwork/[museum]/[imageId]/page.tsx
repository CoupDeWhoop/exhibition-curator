import SingleArtwork from "@/app/components/SingleArtwork";
import fetchSingleArtwork from "@/lib/fetchSingleArtwork";

type Props = {
  params: {
    imageId: string;
    museum: string;
  };
};

export default async function Page({ params: { imageId, museum } }: Props) {
  const artworkResponse = await fetchSingleArtwork(imageId, museum);

  if (!artworkResponse) {
    return <div>Artwork not found</div>;
  }
  const artwork = artworkResponse;
  return (
    <SingleArtwork
      key={`${museum}-${imageId}`}
      museum={museum}
      artwork={artwork}
    />
  );
}
