import fetchArtworks from "@/lib/fetchArtworks";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPrevNextPage";
import Footer from "./Footer";
import { NormalizedArtworksResults } from "@/models/normalizedSchema";
import ImageGrid from "./ImageGrid";

type Props = {
  museum?: string | undefined;
  topic?: string | undefined;
  page?: string | undefined;
};

type MuseumUrl = {
  [key: string]: {
    baseUrl: string;
    fields?: string;
  };
};
const museumUrl: MuseumUrl = {
  chicago: {
    baseUrl: "https://api.artic.edu/api/v1",
    fields: "id,title,image_id,thumbnail,date_display,artist_title",
  },
  harvard: {
    baseUrl: "https://api.harvardartmuseums.org",
    fields: "century=18th%20century&classification=Paintings",
  },
  default: {
    baseUrl:
      "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title",
  },
};

export default async function Gallery({
  museum = "chicago",
  topic = "artworks",
  page,
}: Props) {
  let limit = (20).toString();
  let url;
  let artworks: NormalizedArtworksResults | undefined;

  const {
    [museum]: { baseUrl, fields },
  } = museumUrl;

  switch (museum) {
    case "chicago": {
      if (topic === "artworks" && page) {
        // browsing beyond home
        url = `${baseUrl}/artworks?fields=${fields}&page=${page}&limit=${limit}`;
      } else if (topic === "artworks") {
        // home
        url = `${baseUrl}/artworks?fields=${fields}&limit=${limit}`;
      } else if (!page) {
        // 1st page of search results
        url = `${baseUrl}/search?q=${topic}&fields=${fields}&limit=${limit}`;
      } else {
        // search results beyond first page
        url = `${baseUrl}/search?q=${topic}&fields=${fields}&page=${page}&limit=${limit}`;
      }
    }
    case "harvard": {
      if (topic === "artworks" && page) {
        url = `${baseUrl}/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&${fields}&page=${page}`;
      } else if (topic === "artworks") {
        console.log(
          `${baseUrl}/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&${fields}`
        );
        url = `https://api.harvardartmuseums.org/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&century=18th%20century&classification=Paintings`;

        // url = `${baseUrl}/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&${fields}`;
      } else if (!page) {
        url = `${baseUrl}/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}`;
      } else {
        url = `${baseUrl}/object?apikey=${process.env.HARVARD_ACCESS_KEY}&size=${limit}&q=${topic}&page=${page}`;
      }
    }
    default:
      url = museumUrl.default.baseUrl;
  }

  artworks = await fetchArtworks(url, museum);

  if (!artworks! || artworks.pagination?.totalRecords === 0)
    return <h2 className="m-4 text-2xl font-bold">No Artworks Found</h2>;

  const { prevPage, nextPage } = getPrevNextPage(artworks);

  const footerProps = { topic, page, nextPage, prevPage, museum };

  // I've removed this as the performance was terrible in development
  // const photosWithBlur = addBlurredDataUrls(artworks, museum); // returns artwork data array

  const { data } = artworks;

  return (
    <>
      {!page && (
        <p className="text-2xl sm:text-3xl p-4 px-10 sm:px-5 text-gray-500 pb-8 md:max-w-[70%]">
          Explore artworks from a growing collection of artworks and objects
          from different museums around the world.
        </p>
      )}
      <ImageGrid data={data} />
      <Footer {...footerProps} />
    </>
  );
}
