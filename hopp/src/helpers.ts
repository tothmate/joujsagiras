import { DateTime } from "luxon";
import { GeneratorMode, Sticker, StickerChange } from "./models";

export function updateSticker(sticker: Sticker, updates: StickerChange): Sticker {
  return { ...sticker, ...updates };
}

export function getDescriptiveTitle(text: string, language?: string) {
  const exclamation = "HOPP!";
  if (!text) {
    return exclamation;
  }

  if (text.startsWith("Ez")) {
    return `${exclamation} ${text}`;
  }

  return `${exclamation} ${language === "en" ? "It's" : "Ez"} ${text}`;
}

function getUrlSuffixByMode(mode: GeneratorMode) {
  switch (mode) {
    case GeneratorMode.Share:
      return "/";
    case GeneratorMode.Png:
      return ".png";
    case GeneratorMode.Jpg:
      return ".jpg";
  }
}

export function getUrlForSticker(sticker: Sticker, mode: GeneratorMode): string {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/hopp/${sticker.reason.slug}/${sticker.id}${getUrlSuffixByMode(mode)}`;
}

export function getLanguageFromSlug(slug: string): string {
  return slug.startsWith("en-") ? "en" : "hu";
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
  return sticker.source.url ? new URL(sticker.source.url).hostname : "";
}

export function track(eventName: string, eventType: string) {
  if (typeof window !== "undefined" && (<any>window).umami) {
    (<any>window).umami.trackEvent(eventName, eventType);
  }
}
