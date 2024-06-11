import Image from "next/image";
import { chicagoImageLoader, harvardImageLoader } from "../loader";
import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";
import { NormalizedArtwork } from "@/models/normalizedSchema";
import Link from "next/link";

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
  const widthHeightRatio = artwork.height / artwork.width;
  const galleryHeight = 250 * widthHeightRatio;
  const photoSpans = Math.ceil(galleryHeight / 10) + 10;

  return (
    <div
      className="pt-10 mx-6 border-b-[1px]"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <Link href={`/artwork/${museum}/${artwork.id}`}>
        <div className="group">
          <Image
            loader={chooseLoader(museum)}
            src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
            alt={artwork.altText || artwork.title}
            height={artwork.height}
            width={artwork.width}
            placeholder="blur"
            blurDataURL={artwork.blurredDataUrl}
            className="w-full h-full object-contain group-hover:opacity-75"
          />
        </div>
        <div className="pt-4 pb-4">
          {/* <p>{artwork.id}</p> */}
          <h2 className="sm:text-2xl truncate whitespace-normal line-clamp-2">
            {`${artwork.title}${
              artwork.dateDisplay ? `, ${artwork.dateDisplay}` : ""
            }`}
          </h2>

          <h4 className="sm:text-lg pt-2 text-gray-500 truncate whitespace-normal">
            {artwork.artistTitle ?? artwork.culture}
          </h4>
        </div>
      </Link>
    </div>
  );
}
