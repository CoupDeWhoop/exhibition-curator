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

export const normalizedPaginationSchema = z.object({
  totalRecords: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  page: z.number(),
  nextUrl: z.string().url().nullable().optional(),
  prevUrl: z.string().url().nullable().optional(),
});

const configSchema = z.object({
  iiif_url: z.string().url(),
  website_url: z.string().url(),
});
export const normalizedResponseSchema = z.object({
  pagination: normalizedPaginationSchema.optional(),
  data: z.union([z.array(normalizedItemSchema), normalizedItemSchema]),
  config: configSchema.optional(),
});

export type NormalizedArtworksResults = z.infer<
  typeof normalizedResponseSchema
>;
