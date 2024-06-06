import { z } from "zod";

export const normalizedItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  dateDisplay: z.string().nullable(),
  artistTitle: z.string().nullable(),
  artistDisplay: z.string().nullable().optional(),
  placeOfOrigin: z.string().optional(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().optional(),
  altText: z.string().nullable(),
  blurredDataUrl: z.string().optional(),
  categoryTitles: z.array(z.string()).nullable().optional(),
});

export type NormalizedArtwork = z.infer<typeof normalizedItemSchema>;

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
export const normalisedResponseSchema = z.object({
  pagination: paginationSchema.optional(),
  data: z.union([z.array(normalizedItemSchema), normalizedItemSchema]),
  config: configSchema.optional(),
});

export type NormalizedArtworksResults = z.infer<
  typeof normalisedResponseSchema
>;
