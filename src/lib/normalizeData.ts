import {
  HarvardArtworkResults,
  harvardArtworkSchema,
  HarvardArtwork,
  harvardPaginationSchema,
  HarvardPagination,
} from "@/models/harvardSchemas";
import {
  ChicagoArtwork,
  ChicagoArtworksResults,
  ChicagoPagination,
  chicagoArtworkSchema,
  chicagoPaginationSchema,
} from "@/models/chicagoSchemas";
import {
  normalizedItemSchema,
  normalizedPaginationSchema,
} from "../models/normalizedSchema";
import generateImageUrl from "./getChicagoImageUrl";
import {
  isChicagoArtworksResults,
  isHarvardArtworkResults,
} from "@/models/typeGuards";

export type ApiResponse = ChicagoArtworksResults | HarvardArtworkResults;

export const extractApiData = (response: ApiResponse) => {
  if (isChicagoArtworksResults(response)) {
    return { data: response.data, pagination: response.pagination };
  } else if (isHarvardArtworkResults(response)) {
    return {
      data: response.records,
      pagination: response.info,
    };
  } else {
    throw new Error("Unknown source");
  }
};

type HarvardImage = {
  alttext?: string | null;
};

function generateHarvardAltText(imageArray: HarvardImage[] | null | undefined) {
  if (!imageArray || imageArray.length === 0) {
    return null;
  } else {
    return imageArray[0].alttext;
  }
}
type HarvardPeople = {
  displaydate?: string | null;
  displayname?: string | null;
};

function generateHarvardNameandDate(
  peopleArray: HarvardPeople[] | null | undefined
) {
  if (!peopleArray || peopleArray.length === 0) {
    return { dateDisplay: null, artistTitle: null };
  } else {
    const dateDisplay = peopleArray[0].displaydate || null;
    const artistTitle = peopleArray[0].displayname || null;
    return { dateDisplay, artistTitle };
  }
}

export const normalizeItem = (
  apiItem: ChicagoArtwork | HarvardArtwork,
  museum: string
) => {
  switch (museum) {
    case "chicago": {
      const parsedItem = chicagoArtworkSchema.parse(apiItem);
      return normalizedItemSchema.parse({
        id: parsedItem.id,
        title: parsedItem.title,
        dateDisplay: parsedItem.date_display,
        artistTitle: parsedItem.artist_title,
        artistDisplay: parsedItem.artist_display,
        altText: parsedItem.thumbnail?.alt_text || parsedItem.title,
        description: parsedItem.description,
        imageUrl: generateImageUrl(parsedItem),
        blurredDataUrl: parsedItem.blurredDataUrl,
        categoryTitles: parsedItem.category_titles,
        // detailsUrl: `/museum1/item/${parsedItem.id}`,
      });
    }
    case "harvard": {
      const parsedItem = harvardArtworkSchema.parse(apiItem);
      let altText = generateHarvardAltText(parsedItem.images);
      const { dateDisplay, artistTitle } = generateHarvardNameandDate(
        parsedItem.people
      );

      const newRecord = {
        id: parsedItem.id,
        title: parsedItem.title,
        dateDisplay: dateDisplay || null,
        artistTitle: artistTitle,
        artistDisplay: null,
        altText: altText || parsedItem.title,
        description: parsedItem.description,
        imageUrl: parsedItem.primaryimageurl || "/images/no-image.png",
        blurredDataUrl: parsedItem.blurredDataUrl,
        categoryTitles: null,
      };
      return normalizedItemSchema.parse(newRecord);
    }
    default:
      throw new Error("Unknown source");
  }
};

type Pagination = ChicagoPagination | HarvardPagination;

export const normalizePagination = (apiItem: Pagination, museum: string) => {
  switch (museum) {
    case "chicago": {
      const parsedItem = chicagoPaginationSchema.parse(apiItem);
      const newData = {
        totalRecords: parsedItem.total,
        limit: parsedItem.limit,
        totalPages: parsedItem.total_pages,
        page: parsedItem.current_page,
        nextUrl: parsedItem.next_url || null,
        prevUrl: parsedItem.prev_url || null,
      };
      return normalizedPaginationSchema.parse(newData);
    }
    case "harvard": {
      const parsedItem = harvardPaginationSchema.parse(apiItem);
      const newData = {
        totalRecords: parsedItem.totalrecords,
        limit: parsedItem.totalrecordsperquery,
        totalPages: parsedItem.pages,
        page: parsedItem.page,
        nextUrl: parsedItem.next || null,
        prevUrl: parsedItem.prev || null,
      };
      return normalizedPaginationSchema.parse(newData);
    }
  }
};
