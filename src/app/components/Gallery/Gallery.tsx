import fetchArtworks from "@/lib/fetchArtworks";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPrevNextPage";
import Footer from "./Footer";
import { NormalizedArtworksResults } from "@/models/normalizedSchema";
import ImageGrid from "./ImageGrid";
import {
  generateChicagoURL,
  generateHarvardURL,
  URLDetails,
} from "@/lib/url-utils";

type Props = {
  museum?: string;
  topic?: string | undefined;
  page?: string | undefined;
};

const generateMuseumURL = (urlDetails: URLDetails): string | null => {
  switch (urlDetails.museum) {
    case "chicago":
      return generateChicagoURL(urlDetails);
    case "harvard":
      return generateHarvardURL(urlDetails);
    default:
      return null;
  }
};

export default async function Gallery({
  museum = "chicago",
  topic = "artworks",
  page,
}: Props) {
  const urlDetails: URLDetails = {
    museum,
    page,
    route: topic === "artworks" ? "/artworks" : "/search",
    searchTopic: topic === "artworks" ? null : topic,
  };

  const url = generateMuseumURL(urlDetails);

  if (!url) {
    return (
      <>
        <h1>Oops! Something has gone wrong</h1>
        <p>Please try again later</p>
      </>
    );
  }

  const artworks = await fetchArtworks(url, museum);

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
