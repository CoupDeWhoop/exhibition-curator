import type { ArtworkShort } from "@/models/Images";
import Image from "next/image";
import { chicagoImageLoader } from "../loader";

import { RECOMMENDED_SIZE } from "@/lib/fetchArtworks";

type Props = {
  artwork: ArtworkShort;
};

export default function ImgContainer({ artwork }: Props) {
  return (
    <div className="p-4 py-6 rounded-xl group">
      <Image
        loader={chicagoImageLoader}
        src={`${artwork.image_id}${RECOMMENDED_SIZE}`}
        // src={"42/249/large_1862_0005__0001_.jpg"}
        // (?.) ensures that you safely access alt_text even if thumbnail is null or undefined. avoids error
        alt={artwork.thumbnail?.alt_text || artwork.title}
        height={250}
        width={250}
        placeholder="blur"
        blurDataURL={artwork.blurredDataUrl}
        className="h-auto w-full object-contain group-hover:opacity-75"
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
