import { DateTime } from 'luxon';
import { Result } from 'neverthrow';
import { getLocallizedDateString } from './helpers';

export type Reason = {
  slug: string;
  text: string;
  details: string[];
};

export type Source = {
  url: string;
  title: string;
  date: string;
  image?: string;
};

export type Sticker = {
  id: string;
  reason: Reason;
  explanation: string;
  source: Source;
};

export type StickerChange = {
  id?: string;
  reason?: Reason;
  explanation?: string;
  source?: Source;
};

export enum GeneratorMode {
  Edit = 1,
  Share,
  View,
  Png
}

export const reasons: Reason[] = [
  {
    slug: 'nem-tenyszeru',
    text: 'nem tényszerű',
    details: [
      'A jó újságírás tényszerűen tájékoztat, ezért ellenőrzi a tényszerűségét annak ami ír.',
      'A nem tényszerű újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.'
    ]
  },
  {
    slug: 'nem-hiteles',
    text: 'nem hiteles',
    details: [
      'A jó újságírás hitelesen tájékoztat, ezért visszakövethetővé és ezzel ellenőrizhetővé teszi az írásban hivatkozott tényeket.',
      'A nem hiteles újságírás – mivel nehezebben ellenőrizhető – könnyebben elferdítheti a valóságot.'
    ]
  },
  {
    slug: 'nem-pontos',
    text: 'nem pontos',
    details: [
      'A jó újságírás pontosan tájékoztat, ezért adatokkal támasztja alá az állításait.',
      'A pontatlan újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.'
    ]
  }
];

export const emptySticker: Sticker = {
  id: '',
  reason: { slug: '', text: '', details: [] },
  explanation: '',
  source: { url: '', title: '', date: getLocallizedDateString(DateTime.now()) }
};

export enum StickerStoreErrorType {
  NotFound = 1,
  CouldNotLoad,
  CouldNotSave
}

export type StickerStoreError = {
  type: StickerStoreErrorType;
  message?: string;
};

export type StickerStore = {
  load: (stickerId: string) => Promise<Result<Sticker, StickerStoreError | null>>;
  save: (sticker: Sticker) => Promise<Result<string, StickerStoreError | null>>;
};
