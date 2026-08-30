import { uk } from "./uk";
import { en } from "./en";

export type Lang = "uk" | "en";
export const CONTENT: Record<Lang, import("./types").Content> = { uk, en };
export type { Content } from "./types";
