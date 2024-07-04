const LIMIT = "20";
const harvardKey: string | undefined = process.env.HARVARD_ACCESS_KEY;

export type URLDetails = {
  path: string;
  page?: string;
};

export function generateChicagoURL(urlDetails: URLDetails) {
  const baseUrl = "https://api.artic.edu/api/v1";
  const fieldsToFetch = "id,title,image_id,thumbnail,date_display,artist_title";

  const url = new URL(baseUrl);
  url.pathname += urlDetails.path;
  url.searchParams.append("fields", fieldsToFetch);
  url.searchParams.append("limit", LIMIT);
  if (urlDetails.page) url.searchParams.append("page", urlDetails.page);

  return url.href;
}

export function generateHarvardURL(urlDetails: URLDetails) {
  if (!harvardKey) {
    throw new Error("Harvard API key is not set");
  }
  const baseUrl = "https://api.harvardartmuseums.org";
  const homeParams = new URLSearchParams({
    century: "18th century",
    classification: "Paintings",
  });

  const url = new URL(baseUrl);
  url.pathname = "object";
  url.searchParams.append("apikey", harvardKey);

  if (urlDetails.path === "/artworks") {
    homeParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }
  url.searchParams.append("size", LIMIT);

  if (urlDetails.page) url.searchParams.append("page", urlDetails.page);

  console.log(url.href);
  return url.href;
}
