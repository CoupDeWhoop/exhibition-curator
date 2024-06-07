import type { ChicagoArtworksResults } from "@/models/chicagoSchemas";

export default function getPrevNextPage(artworks: ChicagoArtworksResults) {
  let nextPage: string | null = null;
  let prevPage: string | null = null;

  const { current_page, total_pages } = artworks.pagination;

  if (current_page === 1) {
    nextPage = "2";
  } else if (current_page >= total_pages) {
    nextPage = null;
  } else if (current_page + 4 < total_pages) {
    nextPage = (current_page + 4).toString();
  } else {
    nextPage = (current_page + 1).toString();
  }

  if (current_page === 1) {
    prevPage = null;
  } else {
    prevPage = (current_page - 1).toString();
  }

  return { prevPage, nextPage };
}
