import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2025-12-04",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
