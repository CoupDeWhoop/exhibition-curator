const LIMIT = "20";
const harvardKey: string | undefined = process.env.HARVARD_ACCESS_KEY;

export type URLDetails = {
  museum: string;
  route: string | null;
  page?: string;
  searchTopic: string | null;
};

export function generateChicagoURL(urlDetails: URLDetails) {
  const baseUrl = "https://api.artic.edu";
  const selectedFields =
    "id,title,image_id,thumbnail,date_display,artist_title";

  const url = new URL(baseUrl);
  url.pathname = "api/v1/artworks";
  if (urlDetails.route !== "/artworks") url.pathname += urlDetails.route;
  url.searchParams.append("fields", selectedFields);
  url.searchParams.append("limit", LIMIT);
  if (urlDetails.searchTopic) url.searchParams.set("q", urlDetails.searchTopic);
  if (urlDetails.page) url.searchParams.append("page", urlDetails.page);

  return url.href;
}

export function generateHarvardURL(urlDetails: URLDetails) {
  if (!harvardKey) {
    throw new Error("Harvard API key is not set");
  }
  const baseUrl = "https://api.harvardartmuseums.org";
  const homePathParams = new URLSearchParams({
    century: "18th century",
    classification: "Paintings",
  });

  const url = new URL(baseUrl);
  //harvard path is always /object
  url.pathname = "object";
  url.searchParams.append("apikey", harvardKey);
  url.searchParams.append("size", LIMIT);
  url.searchParams.append("hasimage", "1");

  let query = "imagepermissionlevel:0";
  if (urlDetails.searchTopic) {
    query += ` AND ${urlDetails.searchTopic}`;
  }
  url.searchParams.append("q", query);

  if (urlDetails.route === "/artworks") {
    homePathParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  if (urlDetails.page) url.searchParams.append("page", urlDetails.page);

  return url.href;
}
