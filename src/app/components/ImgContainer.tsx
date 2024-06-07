import Image from "next/image";
import { chicagoImageLoader, harvardImageLoader } from "../loader";
import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";
import { NormalizedArtwork } from "@/models/normalizedSchema";

type Props = {
  artwork: NormalizedArtwork;
  museum: string;
};

function chooseLoader(museum: string) {
  switch (museum) {
    case "chicago":
      return chicagoImageLoader;
    case "harvard":
      return harvardImageLoader;
  }
}

export default function ImgContainer({ artwork, museum }: Props) {
  return (
    <div className="p-1 py-6 rounded-xl group">
      <Image
        loader={chooseLoader(museum)}
        src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
        // src={"42/249/large_1862_0005__0001_.jpg"}
        // (?.) ensures that you safely access alt_text even if thumbnail is null or undefined. avoids error
        alt={artwork.altText || artwork.title}
        height={250}
        width={250}
        placeholder="blur"
        blurDataURL={artwork.blurredDataUrl}
        className="h-full w-full object-contain group-hover:opacity-75"
      />
      <div className="pb-8 pt-4">
        <p>{artwork.id}</p>
        <h2 className="sm:text-2xl truncate whitespace-normal">{`${artwork.title}, ${artwork.dateDisplay}`}</h2>
        {artwork.artistTitle && (
          <h4 className="sm:text-lg pt-2 text-gray-500 truncate whitespace-normal">
            {artwork.artistTitle}
          </h4>
        )}
      </div>
    </div>
  );
}
