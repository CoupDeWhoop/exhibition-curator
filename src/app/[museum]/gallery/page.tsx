import Gallery from "@/app/components/Gallery";
import Loading from "@/app/loading";
import { Suspense } from "react";

type Props = {
  params: {
    museum: string;
  };
};
export default function Page({ params: { museum } }: Props) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Gallery museum={museum} />
      </Suspense>
    </>
  );
}
