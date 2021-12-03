import { DateTime } from "luxon";
import { GeneratorMode, reasons, Sticker, StickerChange } from "./models";

export function updateSticker(sticker: Sticker, updates: StickerChange): Sticker {
  return { ...sticker, ...updates };
}

export function getReasonBySlug(slug: string) {
  return reasons.find((r) => slug === r.slug);
}

function getUrlSuffixByMode(mode: GeneratorMode) {
  switch (mode) {
    case GeneratorMode.Share:
      return "/";
    case GeneratorMode.Png:
      return ".png";
  }
}

export function getUrlForSticker(sticker: Sticker, mode: GeneratorMode): string {
  const host = typeof window !== "undefined" ? window.location.origin : process.env.VERCEL_URL;
  return `${host}/hopp/${sticker.reason.slug}/${sticker.id}${getUrlSuffixByMode(mode)}`;
}

export function isValidUrl(url: string) {
  return url.startsWith("https://") || url.startsWith("http://");
}

export function getLocallizedDateString(datetime: DateTime) {
  return datetime.setLocale("hu").toLocaleString(DateTime.DATE_FULL);
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getSourceHostname(sticker: Sticker) {
  return new URL(sticker.source.url).hostname;
}
