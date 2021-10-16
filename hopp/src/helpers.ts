import { DateTime } from 'luxon';
import { GeneratorMode, reasons, Sticker, StickerChange } from './models';

export function updateSticker(sticker: Sticker, updates: StickerChange): Sticker {
  return { ...sticker, ...updates };
}

export function getReasonBySlug(slug: string) {
  return reasons.find((r) => slug === r.slug);
}

function getUrlSuffixByMode(mode: GeneratorMode) {
  switch (mode) {
    case GeneratorMode.Edit:
      return '/edit';
    case GeneratorMode.Share:
      return '/';
    case GeneratorMode.View:
      return '/view';
    case GeneratorMode.Png:
      return '.png';
  }
}

export function getModeByUrlSuffix(mode: string) {
  switch (mode) {
    case 'edit':
      return GeneratorMode.Edit;
    case 'view':
      return GeneratorMode.View;
    default:
      return GeneratorMode.Share;
  }
}

export function getUrlForSticker(sticker: Sticker, mode: GeneratorMode, relative: boolean = false): string {
  const host = relative ? '' : process.env.NEXT_PUBLIC_BASE_URL;
  if (!sticker.id) {
    return `${host}/`;
  }
  return `${host}/${sticker.reason.slug}/${sticker.id}${getUrlSuffixByMode(mode)}`;
}

export function isValidUrl(url: string) {
  return url.startsWith('https://') || url.startsWith('http://');
}

export function getLocallizedDateString(datetime: DateTime) {
  return datetime.setLocale('hu').toLocaleString(DateTime.DATE_FULL);
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
