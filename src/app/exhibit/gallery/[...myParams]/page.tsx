import SingleArtwork from "@/app/components/SingleArtwork";
import Loading from "@/app/loading";
import fetchSingleArtwork from "@/lib/fetchSingleArtwork";
import addBlurredDataUrls from "@/lib/getBase64";
import { Suspense } from "react";

type Props = {
  params: {
    myParams: string[];
  };
};

export function generateMetadata({ params: { myParams } }: Props) {
  const museum = myParams[0];
  const itemId = myParams[1];

  return {
    title: `Item ${itemId} from ${museum[0].toUpperCase() + museum.slice(1)}`,
  };
}

export default async function ExhibitItem({ params: { myParams } }: Props) {
  const museum = myParams[0];
  const itemId = myParams[1];

  const artworkResponse = await fetchSingleArtwork(itemId, museum);

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
          key={`${museum}-${itemId}`}
          museum={museum}
          artwork={artworkWithBlur}
        />
      </Suspense>
    </section>
  );
}
