import { z } from "zod";

// Schema for pagination information
const paginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  next_url: z.string().url().optional(),
});

// Schema for API response info
const infoSchema = z.object({
  license_text: z.string(),
  license_links: z.array(z.string().url()),
  version: z.string(),
});

// Schema for API config information
const configSchema = z.object({
  iiif_url: z.string().url(),
  website_url: z.string().url(),
});

// Schema for artwork with thumbnail data
const thumbnailSchema = z.object({
  lqip: z.string(),
  width: z.number(),
  height: z.number(),
  alt_text: z.string(),
});

// Schema for artwork with basic fields
const artworkSchema = z.object({
  id: z.number(),
  thumbnail: thumbnailSchema,
  title: z.string(),
  image_id: z.string(),
  blurredDataUrl: z.string().optional(),
});

export type ArtworkShort = z.infer<typeof artworkSchema>;

// Schema for complete artwork with additional fields
const completeArtworkSchema = z.object({
  _score: z.number(),
  thumbnail: thumbnailSchema,
  api_model: z.string(),
  is_boosted: z.boolean(),
  api_link: z.string().url(),
  id: z.number(),
  title: z.string(),
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  blurredDataUrl: z.string().optional(),
});

// Schema for the API response with selected fields
export const apiResponseShortSchema = z.object({
  pagination: paginationSchema,
  data: z.array(artworkSchema),
  info: infoSchema,
  config: configSchema,
});

export type ArtworksResultsShort = z.infer<typeof apiResponseShortSchema>;

// Schema for the API response with pagination and artworks data
export const apiResponseCompleteSchema = z.object({
  pagination: paginationSchema,
  data: z.array(completeArtworkSchema),
  info: infoSchema,
  config: configSchema,
});

export type ArtworksResultsComplete = z.infer<typeof apiResponseCompleteSchema>;

// Schema for a single artwork with detailed fields
export const singleArtworkAllDetailsSchema = z.object({
  id: z.number(),
  api_model: z.string(),
  api_link: z.string().url(),
  is_boosted: z.boolean(),
  title: z.string(),
  alt_titles: z.string().nullable(),
  thumbnail: thumbnailSchema,
  main_reference_number: z.string(),
  has_not_been_viewed_much: z.boolean(),
  boost_rank: z.number().nullable(),
  date_start: z.number(),
  date_end: z.number(),
  date_display: z.string(),
  date_qualifier_title: z.string(),
  date_qualifier_id: z.number(),
  artist_display: z.string(),
  place_of_origin: z.string(),
  description: z.string(),
  short_description: z.string(),
  dimensions: z.string(),
  dimensions_detail: z.array(
    z.object({
      depth: z.number().nullable(),
      width: z.number(),
      height: z.number(),
      diameter: z.number().nullable(),
      clarification: z.string().nullable(),
    })
  ),
  medium_display: z.string(),
  inscriptions: z.string(),
  credit_line: z.string(),
  catalogue_display: z.string().nullable(),
  publication_history: z.string(),
  exhibition_history: z.string().nullable(),
  provenance_text: z.string().nullable(),
  edition: z.string().nullable(),
  publishing_verification_level: z.string(),
  internal_department_id: z.number(),
  fiscal_year: z.string().nullable(),
  fiscal_year_deaccession: z.string().nullable(),
  is_public_domain: z.boolean(),
  is_zoomable: z.boolean(),
  max_zoom_window_size: z.number(),
  copyright_notice: z.string(),
  has_multimedia_resources: z.boolean(),
  has_educational_resources: z.boolean(),
  has_advanced_imaging: z.boolean(),
  colorfulness: z.number(),
  color: z.object({
    h: z.number(),
    l: z.number(),
    s: z.number(),
    percentage: z.number(),
    population: z.number(),
  }),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  latlon: z.string().nullable(),
  is_on_view: z.boolean(),
  on_loan_display: z.string().nullable(),
  gallery_title: z.string().nullable(),
  gallery_id: z.number().nullable(),
  nomisma_id: z.string().nullable(),
  artwork_type_title: z.string(),
  artwork_type_id: z.number(),
  department_title: z.string(),
  department_id: z.string(),
  artist_id: z.number(),
  artist_title: z.string(),
  alt_artist_ids: z.array(z.number()),
  artist_ids: z.array(z.number()),
  artist_titles: z.array(z.string()),
  category_ids: z.array(z.string()),
  category_titles: z.array(z.string()),
  term_titles: z.array(z.string()),
  style_id: z.number().nullable(),
  style_title: z.string().nullable(),
  alt_style_ids: z.array(z.number()),
  style_ids: z.array(z.number()),
  style_titles: z.array(z.string()),
  classification_id: z.string(),
  classification_title: z.string(),
  alt_classification_ids: z.array(z.string()),
  classification_ids: z.array(z.string()),
  classification_titles: z.array(z.string()),
  subject_id: z.string(),
  alt_subject_ids: z.array(z.string()),
  subject_ids: z.array(z.string()),
  subject_titles: z.array(z.string()),
  material_id: z.string(),
  alt_material_ids: z.array(z.string()),
  material_ids: z.array(z.string()),
  material_titles: z.array(z.string()),
  technique_id: z.string().nullable(),
  alt_technique_ids: z.array(z.string()),
  technique_ids: z.array(z.string()),
  technique_titles: z.array(z.string()),
  theme_titles: z.array(z.string()),
  image_id: z.string(),
  alt_image_ids: z.array(z.string()),
  document_ids: z.array(z.string()),
  sound_ids: z.array(z.string()),
  video_ids: z.array(z.string()),
  text_ids: z.array(z.string()),
  section_ids: z.array(z.string()),
  section_titles: z.array(z.string()),
  site_ids: z.array(z.string()),
  suggest_autocomplete_all: z.array(
    z.object({
      input: z.array(z.string()),
      contexts: z.object({
        groupings: z.array(z.string()),
      }),
    })
  ),
  source_updated_at: z.string(),
  updated_at: z.string(),
  timestamp: z.string(),
  blurredDataUrl: z.string().optional(),
});

export type SingleArtworkComplete = z.infer<
  typeof singleArtworkAllDetailsSchema
>;
