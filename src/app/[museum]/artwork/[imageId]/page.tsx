import AddButton from "@/app/components/AddButton";
import SingleArtwork from "@/app/components/SingleArtwork";
import Loading from "@/app/loading";
import fetchSingleArtwork from "@/lib/fetchSingleArtwork";
import addBlurredDataUrls from "@/lib/getBase64";
import { Suspense } from "react";

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

  const artworkWithBlur = await addBlurredDataUrls(artworkResponse, museum);

  if (Array.isArray(artworkWithBlur))
    throw new Error("incompatable artwork data");

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <SingleArtwork
          key={`${museum}-${imageId}`}
          museum={museum}
          artwork={artworkWithBlur}
        />

        <AddButton artwork={artworkWithBlur} />
      </Suspense>
    </section>
  );
}
