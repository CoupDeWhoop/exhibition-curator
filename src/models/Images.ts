import { z } from "zod";
export let IIIF_URL: string = "https://www.artic.edu/iiif/2";
export const RECOMMENDED_SIZE = 843;
export const imagePath = "/full/843,/0/default.jpg";
export const PLACEHOLDER_IMAGE_URL =
  "https://via.placeholder.com/843x843?text=No+Image+Available";

function generateImagePath(artwork: any) {
  const { image_id, thumbnail } = artwork;
  let imagePath;

  if (thumbnail && image_id) {
    imagePath =
      thumbnail.width >= RECOMMENDED_SIZE &&
      thumbnail.height >= RECOMMENDED_SIZE
        ? `/${image_id}/full/${RECOMMENDED_SIZE},/0/default.jpg`
        : `/${image_id}/full/${Math.min(
            thumbnail.width,
            thumbnail.height
          )},/0/default.jpg`;
  } else {
    imagePath = "/images/no-image.png";
  }
  return {
    ...artwork,
    image_path: imagePath,
  };
}

// Schema for pagination information
const paginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  next_url: z.string().url().optional(),
  prev_url: z.string().url().optional(),
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
const thumbnailSchema = z
  .object({
    lqip: z.string(),
    width: z.number(),
    height: z.number(),
    alt_text: z.string(),
  })
  .nullable();

// Schema for artwork with basic fields
const artworkSchemaShort = z
  .object({
    _score: z.number().optional(),
    id: z.number(),
    thumbnail: thumbnailSchema.nullable(),
    title: z.string(),
    artist_title: z.string().nullable(),
    date_display: z.string().nullable(),
    image_id: z.string().nullable(),
    blurredDataUrl: z.string().optional(),
  })
  .transform(generateImagePath);

export type ArtworkShort = z.infer<typeof artworkSchemaShort>;

// Schema for the API response with selected fields
export const apiResponseShortSchema = z.object({
  pagination: paginationSchema,
  data: z.array(artworkSchemaShort),
  // .transform((items) =>
  //   // Filter out items missing image_id
  //   items.filter((item) => item.image_id !== null)
  // ),
  info: infoSchema,
  config: configSchema,
});

export type ArtworksResultsShort = z.infer<typeof apiResponseShortSchema>;

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

// Schema for the API response with pagination and artworks data
export const apiResponseCompleteSchema = z.object({
  pagination: paginationSchema,
  data: z.array(completeArtworkSchema),
  info: infoSchema,
  config: configSchema,
});

export type ArtworksResultsComplete = z.infer<typeof apiResponseCompleteSchema>;

const colorSchema = z
  .object({
    h: z.number(),
    l: z.number(),
    s: z.number(),
    percentage: z.number(),
    population: z.number(),
  })
  .nullable();

const suggestAutocompleteSchema = z.array(
  z.object({
    input: z.array(z.string()),
    contexts: z.object({
      groupings: z.array(z.string()),
    }),
  })
);

export const singleArtworkAllDetailsSchema = z
  .object({
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
    date_qualifier_id: z.number().nullable(),
    artist_display: z.string(),
    place_of_origin: z.string().nullable(),
    description: z.string().nullable(),
    short_description: z.string().nullable(),
    dimensions: z.string(),
    dimensions_detail: z.any().nullable(),
    medium_display: z.string(),
    inscriptions: z.string().nullable(),
    credit_line: z.string(),
    catalogue_display: z.string().nullable(),
    publication_history: z.string().nullable(),
    exhibition_history: z.string().nullable(),
    provenance_text: z.string().nullable(),
    edition: z.string().nullable(),
    publishing_verification_level: z.string(),
    internal_department_id: z.number(),
    fiscal_year: z.number().nullable(),
    fiscal_year_deaccession: z.number().nullable(),
    is_public_domain: z.boolean(),
    is_zoomable: z.boolean(),
    max_zoom_window_size: z.number(),
    copyright_notice: z.string().nullable(),
    has_multimedia_resources: z.boolean(),
    has_educational_resources: z.boolean(),
    has_advanced_imaging: z.boolean(),
    colorfulness: z.number().nullable(),
    color: colorSchema,
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
    artist_id: z.number().nullable(),
    artist_title: z.string().nullable(),
    alt_artist_ids: z.array(z.number()),
    artist_ids: z.array(z.number()),
    artist_titles: z.array(z.string()),
    category_ids: z.array(z.string()),
    category_titles: z.array(z.string()),
    term_titles: z.array(z.string()),
    style_id: z.string().nullable(),
    style_title: z.string().nullable(),
    style_ids: z.array(z.string()).nullable(),
    style_titles: z.array(z.string()).nullable(),
    classification_id: z.string().nullable(),
    classification_title: z.string().nullable(),
    alt_classification_ids: z.array(z.string()),
    classification_ids: z.array(z.string()),
    classification_titles: z.array(z.string()),
    subject_id: z.string().nullable(),
    alt_subject_ids: z.array(z.string()),
    subject_ids: z.array(z.string()),
    subject_titles: z.array(z.string()),
    material_id: z.string().nullable(),
    alt_material_ids: z.array(z.string()),
    material_ids: z.array(z.string()),
    material_titles: z.array(z.string()),
    technique_id: z.string().nullable(),
    alt_technique_ids: z.array(z.string()),
    technique_ids: z.array(z.string()),
    technique_titles: z.array(z.string()),
    theme_titles: z.array(z.string()),
    image_id: z.string().nullable(),
    alt_image_ids: z.array(z.string()),
    document_ids: z.array(z.string()),
    sound_ids: z.array(z.string()),
    video_ids: z.array(z.string()),
    text_ids: z.array(z.string()),
    section_ids: z.array(z.number()),
    section_titles: z.array(z.string()),
    site_ids: z.array(z.string()),
    suggest_autocomplete_all: suggestAutocompleteSchema,
    source_updated_at: z.string(),
    updated_at: z.string(),
    timestamp: z.string(),
    blurredDataUrl: z.string().optional(),
  })
  .transform(generateImagePath);

export const singleArtworkResponseCompleteSchema = z.object({
  data: singleArtworkAllDetailsSchema,
  info: infoSchema,
  config: configSchema,
});

export type SingleArtworkData = z.infer<typeof singleArtworkAllDetailsSchema>;

export type SingleArtworkResultComplete = z.infer<
  typeof singleArtworkResponseCompleteSchema
>;
