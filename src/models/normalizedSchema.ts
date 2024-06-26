import { z } from "zod";

export const normalizedItemSchema = z.object({
  museum: z.string(),
  id: z.number(),
  title: z.string(),
  dateDisplay: z.string().nullable(),
  artistTitle: z.string().nullable(),
  artistDisplay: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  period: z.string().nullable().optional(),
  culture: z.string().nullable().optional(),
  imageUrl: z.string(),
  height: z.number(),
  width: z.number(),
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
