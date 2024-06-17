import fetchArtworks from "@/lib/fetchArtworks";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPrevNextPage";
import Footer from "./Footer";
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
  let limit = (30).toString();
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
      break;
    }
    case "harvard": {
      if (topic === "artworks" && page) {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&century=18th%20century&classification=Paintings&page=${page}&hasimage=1&q:{}_exists_:primaryimageurl`;
      } else if (topic === "artworks") {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&century=18th%20century&classification=Paintings&hasimage=1&q_exists_:primaryimageurl`;
      } else if (!page) {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}&q_exists_:primaryimageurl`;
      } else {
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}&page=${page}&hasimage=1&q_exists_:primaryimageurl`;
      }
      break;
    }
    default: {
      url = `https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&page=${page}&limit=${limit}`;
    }
  }

  artworks = await fetchArtworks(url, museum);

  if (!artworks! || artworks.pagination?.totalRecords === 0)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(artworks, museum); // just collects array of artwork data

  const { prevPage, nextPage } = getPrevNextPage(artworks);

  const footerProps = { topic, page, nextPage, prevPage, museum };

  return (
    <>
      {!page && (
        <p className="text-2xl sm:text-3xl p-4 px-10 sm:px-5 text-gray-500 pb-8 md:max-w-[70%]">
          Explore artworks from a growing collection of artworks and objects
          from different museums around the world.
        </p>
      )}
      <section className="grid grid-cols-gallery min-w-1">
        {/* min-w-1 needed for handling the text whitespace  */}

        {Array.isArray(photosWithBlur) &&
          photosWithBlur.map((artwork, index) => (
            <ImgContainer
              key={artwork.id}
              artwork={artwork}
              museum={museum}
              link={`/${museum}/artwork/${artwork.id}`}
              index={index}
            />
          ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
