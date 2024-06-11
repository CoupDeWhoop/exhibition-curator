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
    <>
      <div className="p-1 py-6 h-64 relative overflow-hidden group">
        <Image
          loader={chooseLoader(museum)}
          src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
          alt={artwork.altText || artwork.title}
          fill={true}
          placeholder="blur"
          blurDataURL={artwork.blurredDataUrl}
          className="object-cover group-hover:opacity-75"
        />
      </div>
      <div className="pb-8 pt-4">
        <p>{artwork.id}</p>
        <h2 className="sm:text-2xl truncate whitespace-normal">{`${artwork.title}, ${artwork.dateDisplay}`}</h2>
        {artwork.artistTitle && (
          <h4 className="sm:text-lg pt-2 text-gray-500 truncate whitespace-normal">
            {artwork.artistTitle}
          </h4>
        )}
      </div>
    </>
  );
}
