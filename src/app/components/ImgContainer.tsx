import type { ArtworkShort } from "@/models/Images";
import Image from "next/image";
import { chicagoImageLoader } from "../loader";

type Props = {
  artwork: ArtworkShort;
};

export default function ImgContainer({ artwork }: Props) {
  return (
    <div className="p-1 py-6 rounded-xl group">
      <Image
        loader={chicagoImageLoader}
        src={artwork.image_path}
        // src={"42/249/large_1862_0005__0001_.jpg"}
        // (?.) ensures that you safely access alt_text even if thumbnail is null or undefined. avoids error
        alt={artwork.thumbnail?.alt_text || artwork.title}
        height={250}
        width={250}
        placeholder="blur"
        blurDataURL={artwork.blurredDataUrl}
        className="h-full w-full object-contain group-hover:opacity-75"
      />
      <div className="pb-8 pt-4">
        <h2 className="sm:text-2xl truncate whitespace-normal">{`${artwork.title}, ${artwork.date_display}`}</h2>
        {artwork.artist_title && (
          <h4 className="sm:text-lg pt-2 text-gray-500 truncate whitespace-normal">
            {artwork.artist_title}
          </h4>
        )}
      </div>
    </div>
  );
}
