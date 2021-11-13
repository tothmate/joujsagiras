import { DropdownListCategory } from "./components/dropdownList";

export const attributes: DropdownListCategory[] = [
  {
    title: "Tájékoztatja a társadalmat",
    list: [
      {
        subtitle: "igaz",
        paragraphs: [
          "A jó újságírás tényszerűen tájékoztat, ezért ellenőrzi a tényszerűségét annak ami ír.",
          "A nem valósághű újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },

      {
        subtitle: "ellenőrizhető",
        paragraphs: [
          "A jó újságírás ellenőrizhetően tájékoztat, ezért visszakövethetővé teszi a hivatkozott tényeket.",
          "A nem vagy nehezen ellenőrizhető újságírás könnyen elferdíti a valóságot és félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      { subtitle: "kiegyensúlyozott", paragraphs: [] },
      { subtitle: "értelmezhető", paragraphs: [] },
      { subtitle: "hiteles", paragraphs: [] },
      { subtitle: "őszinte", paragraphs: [] },
      { subtitle: "releváns", paragraphs: [] },
    ],
  },
  {
    title: "Teret ad a vitáknak és véleményeknek",
    list: [
      { subtitle: "véleményt formál", paragraphs: [] },
      { subtitle: "véleményt közzétesz", paragraphs: [] },
      { subtitle: "megkülönbözteti a véleményt a ténytől", paragraphs: [] },
      { subtitle: "ütköztet", paragraphs: [] },
      { subtitle: "higgadt", paragraphs: [] },
    ],
  },
  {
    title: "Ellenőrzi a társadalomban hatalommal bírókat",
    list: [
      { subtitle: "kritikus", paragraphs: [] },
      { subtitle: "elfogulatlan", paragraphs: [] },
      { subtitle: "számonkér", paragraphs: [] },
      { subtitle: "szembesít", paragraphs: [] },
    ],
  },
  {
    title: "Feltárja az igazságot",
    list: [
      { subtitle: "alapos", paragraphs: [] },
      { subtitle: "pontos", paragraphs: [] },
      { subtitle: "megalapozott", paragraphs: [] },
      { subtitle: "megkérdezi a másik felet", paragraphs: [] },
      { subtitle: "méltányos", paragraphs: [] },
      { subtitle: "eredeti", paragraphs: [] },
    ],
  },
  {
    title: "Láthatóvá tesz és felhangosít ügyeket",
    list: [
      { subtitle: "felkarol ügyeket", paragraphs: [] },
      { subtitle: "az egyént védi", paragraphs: [] },
      { subtitle: "széles merítésű", paragraphs: [] },
      { subtitle: "sokszínű", paragraphs: [] },
      { subtitle: "reprezentatív", paragraphs: [] },
    ],
  },
  { title: "Oktatja és neveli az állampolgárokat", list: [] },
];
