import SingleArtwork from "@/app/components/SingleArtwork";
import fetchSingleArtwork from "@/lib/fetchSingleArtwork";

type Props = {
  params: {
    imageId: string;
  };
};

export default async function Page({ params: { imageId } }: Props) {
  const artwork = await fetchSingleArtwork(imageId);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return <SingleArtwork artwork={artwork.data} />;
}
