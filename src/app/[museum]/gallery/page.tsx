import Gallery from "@/app/components/Gallery/Gallery";

type Props = {
  params: {
    museum: string;
  };
};
export default function Page({ params: { museum } }: Props) {
  return <Gallery museum={museum} />;
}
