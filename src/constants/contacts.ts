const env = import.meta.env;

/** Contact endpoints come from env so nothing personal is hardcoded. */
export const CONTACTS = {
  email: (env.VITE_EMAIL_URL as string | undefined) ?? "",
  github: (env.VITE_GITHUB_URL as string | undefined) ?? "",
  linkedin: (env.VITE_LINKEDIN_URL as string | undefined) ?? "",
  telegram: (env.VITE_TELEGRAM_URL as string | undefined) ?? "",
};

/** github.com/foo — drop the scheme, it's noise in a monospace chip. */
export const prettyUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");
