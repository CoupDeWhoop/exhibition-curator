import type { NormalizedArtworksResults } from "@/models/normalizedSchema";

export default function getPrevNextPage(artworks: NormalizedArtworksResults) {
  let nextPage: string | null = null;
  let prevPage: string | null = null;

  if (!artworks.pagination) return { prevPage, nextPage };

  const { page, totalPages } = artworks.pagination;
  console.log(page, totalPages);

  if (page >= totalPages) {
    nextPage = null;
  } else if (page === 1) {
    nextPage = "2";
  } else if (page + 4 < totalPages) {
    nextPage = (page + 4).toString();
  } else {
    nextPage = (page + 1).toString();
  }

  if (page === 1) {
    prevPage = null;
  } else {
    prevPage = (page - 1).toString();
  }

  return { prevPage, nextPage };
}
