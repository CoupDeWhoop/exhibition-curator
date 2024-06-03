import { SingleArtworkData } from "@/models/Images";
import Image from "next/image";
import { chicagoImageLoader } from "../loader";

const base64 =
  "data:image/gif;base64,R0lGODlhCQAFAPUAABggIBwlJRwoKB0oKR0uNRwuOSAmJCooIy8qIy4uJiYrKScvLi0uKDguJTsvJS0wJyM1LzkxJjA0LSQzMC42MSs1NSg7N0MzJkA4K0A+NTFAOzJDPDFCPkFEPytEQzxNSENRSkdWSklcTk1dUVZkVVRqW3aRenmUfKufaH+bgba3h7y8iMG9hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAJAAUAAAYqwMbFgUg8JIuKgkGxcD6kFSsA0HgIhY4KBRqFIIZDJIM5pUwl0WYiGAQBADs=";

type Description = {
  description: string | null;
};

type Props = {
  artwork: SingleArtworkData;
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
          src={artwork.image_path}
          alt={artwork.thumbnail?.alt_text || artwork.title}
          height={250}
          width={250}
          // placeholder="blur"
          // blurDataURL={artwork.thumbnail?.lqip || base64}
          className="h-full w-full object-contain pb-10 max-h-[700px]"
        />
      </div>
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-3xl pb-4">{artwork.title}</h1>
        <p className="text-xl pb-4 text-gray-500">{artwork.date_display}</p>
        <p className="text-xl pb-4 text-gray-500">{artwork.artist_display}</p>
        <p className="text-xl pb-4 text-gray-500">{artwork.place_of_origin}</p>
        <ArtworkDescription description={artwork.description} />
      </div>
    </section>
  );
}
