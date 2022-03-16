import { DateTime } from "luxon";
import { Result } from "neverthrow";
import { getLocallizedDateString } from "./helpers";

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
  Share = 1,
  Png,
}

export const reasons: Reason[] = [
  {
    slug: "egy-kiragadott-reszlet",
    text: "egy kiragadott részlet",
    details: ["A jó újságírás hiteles, tényszerű és értelmezhető."],
  },
  {
    slug: "felrevezeto",
    text: "félrevezető",
    details: ["A jó újságírás hiteles, tényszerű és méltányos."],
  },
  {
    slug: "lejaratas",
    text: "lejáratás",
    details: ["A jó újságírás hiteles, kiegyensúlyozott és méltányos."],
  },
  {
    slug: "szemelyeskedes",
    text: "személyeskedés",
    details: ["A jó újságírás hiteles, tényszerű és méltányos."],
  },
  {
    slug: "megalazo",
    text: "megalázó",
    details: ["A jó újságírás méltányos."],
  },
  {
    slug: "meltanytalan",
    text: "méltánytalan",
    details: ["A jó újságírás méltányos."],
  },
  {
    slug: "hergel",
    text: "hergel",
    details: ["A jó újságírás higgadt."],
  },
  {
    slug: "politikailag-befolyasolt",
    text: "politikailag befolyásolt",
    details: ["A jó újságírás őszinte és elfogulatlan."],
  },
  {
    slug: "velemeny-nem-teny",
    text: "vélemény, nem tény",
    details: ["A jó újságírás megkülönbözteti a véleményt a ténytől."],
  },
  {
    slug: "egy-nevtelen-cikk",
    text: "egy névtelen cikk",
    details: ["A jó újságírás hiteles és ellenőrizhető."],
  },
  {
    slug: "egyoldalu",
    text: "egyoldalú",
    details: ["A jó újságírás kiegyensúlyozott."],
  },
  {
    slug: "jeloletlen-bulvar",
    text: "jelöletlen bulvár",
    details: ["A jó újságírás releváns."],
  },
  {
    slug: "bolhabol-elefant",
    text: "bolhából elefánt",
    details: ["A jó újságírás releváns."],
  },
  {
    slug: "nincs-hivatkozva",
    text: "nincs hivatkozva",
    details: ["A jó újságírás megalapozott, ellenőrizhető és hiteles."],
  },
  {
    slug: "Ezt-meg-ki-mondta",
    text: "Ezt meg ki mondta?",
    details: ["A jó újságírás megalapozott, ellenőrizhető és hiteles."],
  },
  {
    slug: "nem-tenyszeru",
    text: "nem tényszerű",
    details: [
      "A jó újságírás tényszerűen tájékoztat, ezért ellenőrzi a tényszerűségét annak ami ír.",
      "A nem valósághű újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-ellenorizheto",
    text: "nem ellenőrizhető",
    details: [
      "A jó újságírás ellenőrizhetően tájékoztat, ezért visszakövethetővé teszi a hivatkozott tényeket.",
      "A nem vagy nehezen ellenőrizhető újságírás könnyen elferdíti a valóságot és félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-kiegyensulyozott",
    text: "nem kiegyensúlyozott",
    details: [
      "A jó újságírás kiegyensúlyozottan tájékoztat, ezért megkérdez és meghallgat minden releváns felet.",
      "A nem kiegyensúlyozott újságírás részrehajló és félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-hiteles",
    text: "nem hiteles",
    details: [
      "A jó újságírás hitelesen tájékoztat, ezért a szerző a saját nevével vállalja amit ír.",
      "Az az újságíró vagy szerkesztőség, aki nem vállalja fel névvel amit ír, könnyen enged meg magának szakmaiatlan, félrevezető vagy rossz munkát – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-ertelmezheto",
    text: "nem értelmezhető",
    details: [
      "A jó újságírás könnyen értelmezhető módon tájékoztat, ezért kontextusba helyezi a mondanivalóját és ezzel segít értelmezni azt.",
      "Az olyan újságírás, amely nem vagy hiányosan mutatja be egy ügy körülményeit, vagy kiragadja kontextusából, félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-oszinte",
    text: "nem őszinte",
    details: [
      "A jó újságírás őszintén tájékoztat, ezért az elkövetett hibákat egyértelműen és őszintén beismeri, ha változik egy cikk, azt jelöli, ha újabb információ érkezik be, azt közzéteszi.",
      "A nem őszinte újságírás elhallgat tévedéseket, hibákat vagy a cikkhez kapcsolódó beérkező információkat, ezzel félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
  {
    slug: "nem-relevans",
    text: "nem releváns",
    details: [
      "A jó újságírás minden eseményt időszerűen, a jelentőségének megfelelő súllyal és terjedelemben dolgoz fel.",
      "A rossz újságírás nem létező ügyeket kreál, piszlicsáré ügyeket hangosít fel vagy éppen elhallgat fontos ügyeket.",
    ],
  },
  {
    slug: "nem-pontos",
    text: "nem pontos",
    details: [
      "A jó újságírás pontosan tájékoztat, ezért adatokkal, táblázatokkal, ábrákkal támasztja alá az állításait.",
      "A pontatlan újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
    ],
  },
];

export const emptySticker: Sticker = {
  id: "",
  reason: { slug: "", text: "", details: [] },
  explanation: "",
  source: { url: "", title: "", date: getLocallizedDateString(DateTime.now()) },
};

export enum StickerStoreErrorType {
  NotFound = 1,
  CouldNotLoad,
  CouldNotSave,
}

export type StickerStoreError = {
  type: StickerStoreErrorType;
  message?: string;
};

export type StickerStore = {
  load: (stickerId: string) => Promise<Result<Sticker, StickerStoreError | null>>;
  save: (sticker: Sticker) => Promise<Result<string, StickerStoreError | null>>;
};
