/* eslint-disable no-restricted-globals */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Airtable logging
    AIRTABLE_ACCESS_TOKEN: z.string().min(1),
    AIRTABLE_EXPEDIA_CLICKS_BASE_ID: z.string().min(1),
    AIRTABLE_EXPEDIA_CLICKS_TABLE_ID: z.string().min(1),
    EXPEDIA_CLICKS_LAMBDA_SECRET: z.string().min(1),
    EXPEDIA_CLICK_LAMBDA_ENDPOINT: z.string().url(),

    // Expedia API
    EXPEDIA_AUTH_BASE_64: z.string().min(1),
    EXPEDIA_KEY: z.string().min(1),
    EXPEDIA_LISTINGS_BASE_URL: z.string().url(),

    // Vercel
    VERCEL_GIT_COMMIT_SHA: z.string().min(1),
    VERCEL_ACCESS_TOKEN: z.string().min(1),

    // Sentry
    SENTRY_AUTH_TOKEN: z.string().min(1),

    // 🦀 Monterey
    SITEMAP_PAGE_SIZE: z.string().min(1),
    COLLECTIONS_SIZE: z.string().min(1),
    LISTINGS_SIZE: z.string().min(1),
    COLLETION_SLUG_MAX_LENGTH: z.string().min(1),
    NODE_ENV: z.string().min(1),

    // Cron Jobs
    CRON_SECRET: z.string().min(1),
  },
  client: {
    // Mapbox
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_MAPBOX_AUTOCOMPLETE_API: z.string().url(),

    //Partnerize affiliate platform
    NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK: z.string().url(),

    //Axiom logging
    NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT: z.string().url(),

    // 🦀 Monterey
    NEXT_PUBLIC_WEBSITE_TLD: z.string().min(1),
    NEXT_PUBLIC_COLLECTION_SHOW_MAX_PROPERTIES: z.string().min(1),
    NEXT_PUBLIC_MAX_SEARCH_LIMIT: z.string().min(1),
    NEXT_PUBLIC_DEFAULT_SEARCH_LIMIT: z.string().min(1),
    NEXT_PUBLIC_SHOW_HOTELS_IN_AUTOCOMPLETE: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_MAPBOX_AUTOCOMPLETE_API: process.env.NEXT_PUBLIC_MAPBOX_AUTOCOMPLETE_API,
    NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK: process.env.NEXT_PUBLIC_PARTNERIZE_BASE_AFF_LINK,
    NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT: process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT,
    NEXT_PUBLIC_WEBSITE_TLD: process.env.NEXT_PUBLIC_WEBSITE_TLD,
    NEXT_PUBLIC_COLLECTION_SHOW_MAX_PROPERTIES: process.env.NEXT_PUBLIC_COLLECTION_SHOW_MAX_PROPERTIES,
    NEXT_PUBLIC_MAX_SEARCH_LIMIT: process.env.NEXT_PUBLIC_MAX_SEARCH_LIMIT,
    NEXT_PUBLIC_DEFAULT_SEARCH_LIMIT: process.env.NEXT_PUBLIC_DEFAULT_SEARCH_LIMIT,
    NEXT_PUBLIC_SHOW_HOTELS_IN_AUTOCOMPLETE: process.env.NEXT_PUBLIC_SHOW_HOTELS_IN_AUTOCOMPLETE,
  },
});
