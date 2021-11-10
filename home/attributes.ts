import { foldAccents } from "./utils";

export const attributes = [
  {
    category: "Tájékoztatja a társadalmat",
    attributes: [
      {
        attribute: "igaz",
        explanation: [
          "A jó újságírás tényszerűen tájékoztat, ezért ellenőrzi a tényszerűségét annak ami ír.",
          "A nem valósághű újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },

      {
        attribute: "ellenőrizhető",
        explanation: [
          "A jó újságírás ellenőrizhetően tájékoztat, ezért visszakövethetővé teszi a hivatkozott tényeket.",
          "A nem vagy nehezen ellenőrizhető újságírás könnyen elferdíti a valóságot és félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      { attribute: "kiegyensúlyozott", explanation: [] },
      { attribute: "értelmezhető", explanation: [] },
      { attribute: "hiteles", explanation: [] },
      { attribute: "őszinte", explanation: [] },
      { attribute: "releváns", explanation: [] },
    ],
  },
  {
    category: "Teret ad a vitáknak és véleményeknek",
    attributes: [
      { attribute: "véleményt formál", explanation: [] },
      { attribute: "véleményt közzétesz", explanation: [] },
      { attribute: "megkülönbözteti a véleményt a ténytől", explanation: [] },
      { attribute: "ütköztet", explanation: [] },
      { attribute: "higgadt", explanation: [] },
    ],
  },
  {
    category: "Ellenőrzi a társadalomban hatalommal bírókat",
    attributes: [
      { attribute: "kritikus", explanation: [] },
      { attribute: "elfogulatlan", explanation: [] },
      { attribute: "számonkér", explanation: [] },
      { attribute: "szembesít", explanation: [] },
    ],
  },
  {
    category: "Feltárja az igazságot",
    attributes: [
      { attribute: "alapos", explanation: [] },
      { attribute: "pontos", explanation: [] },
      { attribute: "megalapozott", explanation: [] },
      { attribute: "megkérdezi a másik felet", explanation: [] },
      { attribute: "méltányos", explanation: [] },
      { attribute: "eredeti", explanation: [] },
    ],
  },
  {
    category: "Láthatóvá tesz és felhangosít ügyeket",
    attributes: [
      { attribute: "felkarol ügyeket", explanation: [] },
      { attribute: "az egyént védi", explanation: [] },
      { attribute: "széles merítésű", explanation: [] },
      { attribute: "sokszínű", explanation: [] },
      { attribute: "reprezentatív", explanation: [] },
    ],
  },
  { category: "Oktatja és neveli az állampolgárokat", attributes: [] },
];
