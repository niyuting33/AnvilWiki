/** Public, site-specific analytics configuration. An empty env override disables Clarity. */
export const clarityProjectId = (
  (import.meta.env.PUBLIC_CLARITY_PROJECT_ID as string | undefined) ?? 'z9ezbf0f73'
).trim();
