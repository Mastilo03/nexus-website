// Set VITE_SITE_URL to the live NEXUS origin when deploying.
export const NEXUS_ORIGIN = (
  import.meta.env.VITE_SITE_URL || "https://nexus.example"
).replace(/\/$/, "");
