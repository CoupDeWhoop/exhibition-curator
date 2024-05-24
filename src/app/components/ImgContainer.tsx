import type { ArtworkShort } from "@/models/Images";
import Image from "next/image";
import myImageLoader from "../loader";

const RECOMMENDED_SIZE = "/full/843,/0/default.jpg";

type Props = {
  artwork: ArtworkShort;
};

export default function ImgContainer({ artwork }: Props) {
  return (
    <div key={artwork.id} className="h-64 bg-gray-200 rounded-xl">
      <Image
        loader={myImageLoader}
        src={`${artwork.image_id}${RECOMMENDED_SIZE}`}
        alt={artwork.thumbnail.alt_text}
        width={250}
        height={250}
      />
    </div>
  );
}
