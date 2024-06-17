import Gallery from "@/app/components/Gallery";
import Loading from "@/app/loading";
import { Suspense } from "react";

type Props = {
  params: {
    myParams?: string[]; // Make myParams an optional array of strings
    museum: string;
  };
};

export function generateMetadata({ params: { myParams, museum } }: Props) {
  const topic = myParams?.[0] ?? "artworks";
  const page = myParams?.[1] ?? "1";

  return {
    title: `Results for ${topic} - Page ${page} from ${museum}`,
  };
}

export default function SearchResults({ params: { myParams, museum } }: Props) {
  const topic = myParams?.[0] ?? "artworks";
  const page = myParams?.[1] ?? "1";

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Gallery topic={topic} page={page} museum={museum} />
      </Suspense>
    </>
  );
}
