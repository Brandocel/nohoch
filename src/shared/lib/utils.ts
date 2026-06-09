import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build a full media URL.
 * Accepts either a string path or an object with a `url` property.
 */
export function buildMediaUrl(input: string | { url: string } | null | undefined): string {
  if (!input) return "";
  if (typeof input === "string") return input;
  return input.url ?? "";
}