import { DateTime } from "luxon";
import { Result } from "neverthrow";
import { getLocallizedDateString } from "./helpers";

export type Reason = {
  slug: string;
  text: string;
  details: string;
  defaultExplanation: string;
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
  Share = 1,
  Png,
}

export const emptySticker: Sticker = {
  id: "",
  reason: { slug: "", text: "", details: "", defaultExplanation: "" },
  explanation: "",
  source: { url: "", title: "", date: getLocallizedDateString(DateTime.now()) },
};

export enum StickerStoreErrorType {
  NotFound = 1,
  CouldNotLoad,
  CouldNotLoadReasons,
  CouldNotSave,
}

export type StickerStoreError = {
  type: StickerStoreErrorType;
  message?: string;
};

export type StickerStore = {
  load: (stickerId: string) => Promise<Result<Sticker, StickerStoreError | null>>;
  save: (sticker: Sticker) => Promise<Result<string, StickerStoreError | null>>;
  loadReasons: () => Promise<Result<Reason[], StickerStoreError | null>>;
};
