import type { ArtworkShort } from "@/models/Images";
import Image from "next/image";
import myImageLoader from "../loader";

const RECOMMENDED_SIZE = "/full/843,/0/default.jpg";

type Props = {
  artwork: ArtworkShort;
};

export default function ImgContainer({ artwork }: Props) {
  return (
    <div key={artwork.id} className="relative p-4 py-6 rounded-xl">
      <Image
        loader={myImageLoader}
        src={`${artwork.image_id}${RECOMMENDED_SIZE}`}
        // (?.) ensures that you safely access alt_text even if thumbnail is null or undefined. avoids error
        alt={artwork.thumbnail?.alt_text || artwork.title}
        height={250}
        width={250}
        className="w-full h-full object-cover"
      />
      <div className="pb-8 pt-4">
        <h2 className="text-2xl">{`${artwork.title}, ${artwork.date_display}`}</h2>
        {artwork.artist_title && (
          <h4 className="text-lg pt-2 text-gray-500">{artwork.artist_title}</h4>
        )}
      </div>
    </div>
  );
}
