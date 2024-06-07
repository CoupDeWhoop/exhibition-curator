import Gallery from "@/app/components/Gallery";
import MuseumSelector from "@/app/components/MuseumSelector";
type Props = {
  params: {
    museum: string;
  };
};
export default function Page({ params: { museum } }: Props) {
  return (
    <>
      <Gallery museum={museum} />
    </>
  );
}
