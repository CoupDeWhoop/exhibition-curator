import {
  HarvardArtworkResults,
  harvardArtworkSchema,
  HarvardArtwork,
} from "@/models/harvardSchemas";
import {
  ChicagoArtwork,
  ChicagoArtworksResults,
  chicagoArtworkSchema,
} from "@/models/museumSchemas";
import { normalizedItemSchema } from "../models/normalizedSchema";
import generateImageUrl from "./getChicagoImageUrl";
import {
  isChicagoArtworksResults,
  isHarvardArtworkResults,
} from "@/models/api-utils/typeGuards";

type ApiResponse = {
  response: ChicagoArtworksResults | HarvardArtworkResults;
};
export const extractApiData = (response: ApiResponse, source: string) => {
  if (isChicagoArtworksResults(response)) {
    return response.data;
  } else if (isHarvardArtworkResults(response)) {
    return response.records;
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
  source: string
) => {
  switch (source) {
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
        imageUrl: generateImageUrl(apiItem),
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
