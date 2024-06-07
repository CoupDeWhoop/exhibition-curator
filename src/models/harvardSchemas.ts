import { z } from "zod";

export const harvardPaginationSchema = z.object({
  totalrecords: z.number(),
  totalrecordsperquery: z.number(),
  pages: z.number(),
  page: z.number(),
  next: z.string().url().optional(),
  prev: z.string().url().optional(),
});

export type HarvardPagination = z.infer<typeof harvardPaginationSchema>;

const peopleSchema = z.object({
  displaydate: z.string().nullable().optional(),
  displayname: z.string().nullable().optional(),
});

export const harvardArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  people: z.array(peopleSchema).nullable().optional(),
  description: z.string().nullable().optional(),
  copyright: z.string().nullable(),
  images: z
    .array(
      z.object({
        alttext: z.string().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
  blurredDataUrl: z.string().optional(),
  primaryimageurl: z.string().nullable().optional(),
  artistDisplay: z.string().nullable().optional(),
  categoryTitles: z.array(z.string()).optional(),
});

export type HarvardArtwork = z.infer<typeof harvardArtworkSchema>;

export const harvardApiResponseSchema = z.object({
  info: harvardPaginationSchema,
  records: z.array(harvardArtworkSchema),
});

export type HarvardArtworkResults = z.infer<typeof harvardApiResponseSchema>;
