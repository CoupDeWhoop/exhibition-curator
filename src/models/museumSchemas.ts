import { z } from "zod";

const paginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  next_url: z.string().url().optional(),
  prev_url: z.string().url().optional(),
});

const configSchema = z.object({
  iiif_url: z.string().url(),
  website_url: z.string().url(),
});

const thumbnailSchema = z.object({
  lqip: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  alt_text: z.string(),
});

// Schema for artwork with selected fields
export const chicagoArtworkSchema = z.object({
  _score: z.number().optional(),
  id: z.number(),
  title: z.string(),
  date_display: z.string().nullable(),
  artist_title: z.string().nullable(),
  artist_display: z.string().nullable().optional(),
  thumbnail: thumbnailSchema.nullable(),
  description: z.string().nullable().optional(),
  image_id: z.string().nullable(),
  blurredDataUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  category_titles: z.array(z.string()).optional(),
});

export type ChicagoArtwork = z.infer<typeof chicagoArtworkSchema>;

export const apiResponseSchema = z.object({
  pagination: paginationSchema,
  data: z.array(chicagoArtworkSchema),
  config: configSchema,
});

export type ChicagoArtworksResults = z.infer<typeof apiResponseSchema>;
