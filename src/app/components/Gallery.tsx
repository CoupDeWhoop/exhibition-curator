import fetchArtworks from "@/lib/fetchArtworks";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPrevNextPage";
import Footer from "./Footer";
import Link from "next/link";
import { NormalizedArtworksResults } from "@/models/normalizedSchema";

type Props = {
  museum?: string | undefined;
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({
  museum = "chicago",
  topic = "artworks",
  page,
}: Props) {
  let limit = (40).toString();
  let url;
  let artworks: NormalizedArtworksResults | undefined;

  switch (museum) {
    case "chicago": {
      if (topic === "artworks" && page) {
        // browsing beyond home
        url = `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&page=${page}&limit=${limit}`;
      } else if (topic === "artworks") {
        // home
        url = `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&limit=${limit}`;
      } else if (!page) {
        // 1st page of search results
        url = `https://api.artic.edu/api/v1/artworks/search?q=${topic}&fields=id,title,image_id,thumbnail,date_display,artist_title&limit=${limit}`;
      } else {
        // search results beyond first page
        url = `https://api.artic.edu/api/v1/artworks/search?q=${topic}&fields=id,title,image_id,thumbnail,date_display,artist_title&page=${page}&limit=${limit}`;
      }
      // "https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id,thumbnail";
      break;
    }
    case "harvard": {
      if (topic === "artworks" && page) {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&page=${page}`;
      } else if (topic === "artworks") {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}`;
      } else if (!page) {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}`;
      } else {
        console.log(`searching topic ${topic} in harvard`);
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}&page=${page}`;
      }
      break;
    }
    default: {
      url = `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&page=${page}&limit=${limit}`;
    }
  }

  artworks = await fetchArtworks(url, museum);

  // if (!artworks || artworks.pagination.total === 0) need this back after harvard
  if (!artworks)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(artworks);

  const { prevPage, nextPage } = getPrevNextPage(artworks);

  const footerProps = { topic, page, nextPage, prevPage, museum };

  const columns = 4;
  const columnLimit = Math.ceil(photosWithBlur.length / columns);

  // Create an array of arrays to store images for each set of columns
  const columnSets = [];
  for (let i = 0; i < columns; i++) {
    const start = i * columnLimit;
    const end = Math.min(start + columnLimit, photosWithBlur.length);
    columnSets.push(photosWithBlur.slice(start, end));
  }

  return (
    <>
      <section className="my-3 flex min-w-1">
        {columnSets.map((columnSet, columnIndex) => (
          <div
            key={columnIndex}
            className="flex-1  border-gray-200 px-3 border-r-[1px] last:border-r-0 min-w-1"
          >
            {/* the extra div is just for creating a gap in the image borders */}
            <div className="gap-2">
              {columnSet.map((artwork, rowIndex) => (
                <div
                  key={`${columnIndex}-${rowIndex}`}
                  // className="flex-grow max-w-xs md:max-w-sm flex justify-center"
                  className="border-b-[1px] border-gray-200 last:border-b-0"
                >
                  <Link href={`/artwork/${museum}/${artwork.id}`}>
                    <ImgContainer
                      key={artwork.id}
                      artwork={artwork}
                      museum={museum}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
