import SingleArtwork from "@/app/components/SingleArtwork";
import fetchSingleArtwork from "@/lib/fetchSingleArtwork";

type Props = {
  params: {
    imageId: string;
    museum: string;
  };
};

export default async function Page({ params: { imageId, museum } }: Props) {
  const artwork = await fetchSingleArtwork(imageId, museum);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <SingleArtwork
      key={`${museum}-${imageId}`}
      museum={museum}
      artwork={artwork.data}
    />
  );
}
