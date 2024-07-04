import fetchArtworks from "@/lib/fetchArtworks";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPage from "@/lib/getPrevNextPage";
import Footer from "./Footer";
import { NormalizedArtworksResults } from "@/models/normalizedSchema";
import ImageGrid from "./ImageGrid";
import { generateChicagoURL, generateHarvardURL } from "@/lib/url-utils";

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
  let url;
  let artworks: NormalizedArtworksResults | undefined;
  const urlDetails: {
    path: string;
    page?: string;
  } = {
    path: topic === "artworks" ? "/artworks" : "/search",
    page,
  };

  if (museum === "chicago") {
    url = generateChicagoURL(urlDetails);
  } else if (museum === "harvard") {
    url = generateHarvardURL(urlDetails);
  } else {
    url =
      "https://api.artic.edu/api/v1/artworks?fields=id,title,image_id,thumbnail,date_display,artist_title&limit=40";
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
