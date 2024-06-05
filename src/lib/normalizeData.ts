import { z } from "zod";
import { ChicagoArtwork, chicagoArtworkSchema } from "../models/museumSchemas";
import { normalizedItemSchema } from "../models/normalizedSchema";
import generateImageUrl from "./getChicagoImageUrl";

export const normalizeItem = (apiItem: ChicagoArtwork, source: string) => {
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
    default:
      throw new Error("Unknown source");
  }
};
