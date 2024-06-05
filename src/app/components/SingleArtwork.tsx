import Image from "next/image";
import { chicagoImageLoader } from "../loader";
import Link from "next/link";
import { PLACEHOLDER_IMAGE_URL } from "@/lib/constants";
import { NormalizedArtwork } from "@/models/normalizedSchema";

const backupBase64 =
  "data:image/gif;base64,R0lGODlhCQAFAPUAABggIBwlJRwoKB0oKR0uNRwuOSAmJCooIy8qIy4uJiYrKScvLi0uKDguJTsvJS0wJyM1LzkxJjA0LSQzMC42MSs1NSg7N0MzJkA4K0A+NTFAOzJDPDFCPkFEPytEQzxNSENRSkdWSklcTk1dUVZkVVRqW3aRenmUfKufaH+bgba3h7y8iMG9hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAUAAAYqwMbFgUg8JIuKgkGxcD6kFSsA0HgIhY4KBRqFIIZDJIM5pUwl0WYiGAQBADs=";

type Description = {
  description: string | null | undefined;
};

type Props = {
  artwork: NormalizedArtwork;
};

function ArtworkDescription({ description }: Description) {
  if (description)
    return (
      <div
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    );
}

export default async function SingleArtwork({ artwork }: Props) {
  return (
    <section className="p-4">
      <div>
        <Image
          loader={chicagoImageLoader}
          src={artwork.imageUrl || PLACEHOLDER_IMAGE_URL}
          alt={artwork.altText || artwork.title}
          height={250}
          width={250}
          placeholder="blur"
          blurDataURL={artwork.blurredDataUrl || backupBase64}
          className="h-full w-full object-contain pb-10 max-h-[700px]"
        />
      </div>
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-3xl pb-4">{artwork.title}</h1>
        <p className="text-xl pb-4 text-gray-500">{artwork.dateDisplay}</p>
        <p className="text-xl pb-4 text-gray-500">{artwork.artistDisplay}</p>
        {artwork.placeOfOrigin && (
          <p className="text-xl pb-4 text-gray-500">
            {artwork.placeOfOrigin} (Place of origin)
          </p>
        )}
        <ArtworkDescription description={artwork.description} />
        <div className="flex gap-4">
          {artwork.categoryTitles &&
            artwork.categoryTitles.map((category: string, index: number) => (
              <Link
                key={`${artwork.id}${index}`}
                className="underline decoration-1"
                href="/"
              >
                <p className="text-xl pb-4 text-gray-500">{category}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
