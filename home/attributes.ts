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
      {
        subtitle: "kiegyensúlyozott",
        paragraphs: [
          "A jó újságírás kiegyensúlyozottan tájékoztat, ezért megkérdez és meghallgat minden releváns felet.",
          "A nem kiegyensúlyozott újságírás részrehajló és félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },

      {
        subtitle: "hiteles",
        paragraphs: [
          "A jó újságírás hitelesen tájékoztat, ezért a szerző a saját nevével vállalja amit ír.",
          "Az az újságíró vagy szerkesztőség, aki nem vállalja fel névvel amit ír, könnyen enged meg magának szakmaiatlan, félrevezető vagy rossz munkát – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      {
        subtitle: "értelmezhető",
        paragraphs: [
          "A jó újságírás könnyen értelmezhető módon tájékoztat, ezért kontextusba helyezi a mondanivalóját és ezzel segít értelmezni azt.",
          "Az olyan újságírás, amely nem vagy hiányosan mutatja be egy ügy körülményeit, vagy kiragadja kontextusából, félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      {
        subtitle: "őszinte",
        paragraphs: [
          "A jó újságírás őszintén tájékoztat, ezért az elkövetett hibákat egyértelműen és őszintén beismeri, ha változik egy cikk, azt jelöli, ha újabb információ érkezik be, azt közzéteszi.",
          "A nem őszinte újságírás elhallgat tévedéseket, hibákat vagy a cikkhez kapcsolódó beérkező információkat, ezzel félrevezeti az olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      {
        subtitle: "releváns",
        paragraphs: [
          "A jó újságírás minden eseményt időszerűen, a jelentőségének megfelelő súllyal és terjedelemben dolgoz fel.",
          "A rossz újságírás nem létező ügyeket kreál, piszlicsáré ügyeket hangosít fel vagy éppen elhallgat fontos ügyeket.",
        ],
      },
    ],
  },
  {
    title: "Teret ad a vitáknak és véleményeknek",
    list: [
      {
        subtitle: "véleményt alkot",
        paragraphs: [
          "A jó újságírás a tények közlése mellett véleményt is alkot, amelyet véleményként megjelöl és tesz közzé.",
          "A rossz újságírás sejtet, ködösít, utalgat, ahelyett hogy véleményt fogalmazna meg és tenne közzé.",
        ],
      },
      {
        subtitle: "véleményt közzétesz",
        paragraphs: [
          "A jó újságírás elérhetővé teszi az emberek véleményét, és teret ad vitáknak.",
          "Az olyan újságírás, amely ellentmondásos témákban csak az egyik oldal véleményét ismerteti, túlzottan ... ",
        ],
      },
      {
        subtitle: "megkülönbözteti a véleményt a ténytől",
        paragraphs: [
          "A jó újságírás tényszerű, ezért következetesen és világosan elválasztja egymástól a hírt és a véleményt.",
          "Az olyan újságírás, amely nem különbözteti meg a véleményt a ténytől, félrevezeti az olvasóját.",
        ],
      },
      {
        subtitle: "ütköztet",
        paragraphs: [
          "A jó újságírás ellentmondásos témákban a releváns tények mellett a vonatkozó véleményeket is mérlegeli és teret ad nekik.",
          "Az olyan újságírás, amely ellentmondásos témákban csak az egyik oldal véleményét ismerteti, elfogult és részrehajló, ",
        ],
      },
      {
        subtitle: "visszafogott",
        paragraphs: [
          "A jó újságírás nem kelt feleslegesen szenzációt, hanem higgadtan tájékoztat.",
          "A szenzációkeltő újságírás öncélúan hívja fel magára a figyelmet, és zaklatja, akár felzaklatja az olvasót.",
        ],
      },
      {
        subtitle: "higgadt",
        paragraphs: [
          "A jó újságírás a véleménycserét és vitát higgadt mederben tartja, azért hogy a vita ne lehetetlenüljön el.",
          "A rossz újságírás erőszakosan fogalmaz, gyűlöletet szít vagy felesleges félelmet kelt, ezzel hergeli az olvasóit és megnehezíti vagy akár ellehetetleníti a tisztánlátást és az érdemi vitát.",
        ],
      },
    ],
  },
  {
    title: "Ellenőrzi a társadalomban hatalommal bírókat",
    list: [
      {
        subtitle: "kritikus",
        paragraphs: [
          "A jó újságírás nem fogadja el a kapott válaszokat kritikátlanul, hanem ellenőrzi azokat, rámutat az esetleges hiányosságokra, ellentmondásokra, torzításokra, vagy hiányzó releváns szempontokra.",
          "A válaszokat vagy álláspontokat fenntartások nélkül elfogadó és közzétevő újságírás nem ellenőrzi a társadalomban hatalommal bírókat.",
        ],
      },
      {
        subtitle: "elfogulatlan",
        paragraphs: [
          "A jó újságírás egyenlő mércével fordul a különböző szereplők felé.",
          "Az olyan újságírás, amely egyes szereplők szempontjait mások elé helyezi, nem ellenőrzi a társadalomban hatalommal bírókat.",
        ],
      },
      {
        subtitle: "számonkér",
        paragraphs: [
          "A jó újságírás számonkéri a hazugságot, a csalást és a hatalommal való visszaélést, kérdőre és felelősségre von.",
          "Az olyan újságírás, amely nem kéri számon a hazugságot, csalást vagy visszaélést, nem ellenőrzi a társadalomban hatalommal bírókat."
        ],
      },
      { subtitle: "szembesít", paragraphs: [
        "A jó újságírás szembesíti a közszereplőket ellentmondásos kijelentéseikkel és cselekedeteikkel.",
        "Az olyan újságírás amely szemet húny a rossz érvek, a butaság, a hazugságok, a közszereplők ellentmondásos kijelentései vagy cselekedetei felett, nem ellenőrzi a társadalomban hatalommal bírókat."
      ] },
    ],
  },
  {
    title: "Feltárja az igazságot",
    list: [
      {
        subtitle: "alapos",
        paragraphs: [
          "Az igazság feltárása érdekében gondosan és körültekintően mérlegeli a riport vagy beszámoló tárgyához kapcsolódó valamennyi releváns tényt.",
          "Az olyan újságírás, amely nem mutat be vagy elhallgat fontos tényeket, nem tárja fel az igazságot."
        ],
      },
      { subtitle: "körültekintő", paragraphs: [] },
      {
        subtitle: "pontos",
        paragraphs: [
          "A jó újságírás pontosan tájékoztat, ezért adatokkal, táblázatokkal, ábrákkal támasztja alá az állításait.",
          "A pontatlan újságírás félrevezeti olvasóját – akár szándékosan vagy hanyagságból teszi.",
        ],
      },
      {
        subtitle: "megalapozott",
        paragraphs: [
          "A jó újságírás érvelése logikus és nyomon követhető, az állításait szabatosan, részletesen és konkrétan megfogalmazza és alátámasztja.",
          "A logikai bukfenceket tartalmazó, az egymással csak látszólag összefüggő tényeket összemosó újságírás nem feltárja az igazságot, hanem téves következtetések levonására készteti az olvasót.",
        ],
      },
      {
        subtitle: "megkérdezi a másik felet",
        paragraphs: [
          "A jó újságírás megszólalási lehetőséget biztosít az ügyben érintett másik félnek is.",
          "Az olyan újságírás, amely nem ad megszólalási lehetőséget az ügyben érintett összes releváns félnek, nem tárja fel az igazságot."
        ],
      },
      {
        subtitle: "méltányos",
        paragraphs: [
          "A jó újságírás tiszteletben tartja a magánszférát, amelynek megsértését csak a magasabb társadalmi érdek igazolhatja.",
          "Az olyan újságírás, amelyik ok nélkül beleavatkozik közszereplők magánszférájába, nem az igazságot tárja fel, hanem megfélemlít, megaláz vagy lejárat embereket.",
        ],
      },
      {
        subtitle: "eredeti",
        paragraphs: [
          "A jó újságírás új információkkal és új szempontokkal járul hozzá az igazság feltárásához.",
          "A rossz újságírás nem járul hozzá új információkkal vagy szempontokkal az igazság feltárásához."
      ],
      },
    ],
  },
  {
    title: "Láthatóvá tesz és felhangosít ügyeket",
    list: [
      {
        subtitle: "felkarol ügyeket",
        paragraphs: [
          "A jó újságírás felkutat, feldolgoz, és a társadalom számára megismerhetővé tesz olyan ügyeket, amelyek egyébként nem kapnának nyilvánosságot.",
          "A rossz újságírás elhallgat vagy segít eltussolni ügyeket."
        ],
      },
      { subtitle: "az egyént védi",
       paragraphs: [
        "A jó újságírás a kiszolgáltatott egyént védi a kormánnyal és a társadalomban hatalommal bírókkal szemben.",
        "A rossz újságírás a kormány vagy a társadalomban hatalommal bírók érdekét az egyén elé helyezi."
      ] },
      {
        subtitle: "széles merítésű",
        paragraphs: [
          "A jó újságírás biztosítja a nézetek széles skálájának ismertetését, a véleményeket a jelentőségüknek megfelelő súllyal és terjedelemben dolgozza fel.",
          "A rossz újságírás szándékosan csak egyhangú véleményeket közöl, elfogult, egyoldalú vagy túlzóan egységes képet mutat a társadalmi ügyekről."
        ],
      },
      {
        subtitle: "sokszínű",
        paragraphs: [
          "A jó újságírás a társadalom sokszínűségét a tartalomban is érzékelhetővé teszi.",
          "A rossz újságírás nem veszi figyelembe a társadalom sokszínűségét, az emberek különbözőségét."
        ],
      },
      {
        subtitle: "reprezentatív",
        paragraphs: [
          "A jó újságírás reprezentatív képet nyújt a társadalmat alkotó csoportokról.",
          "A rossz újságírás általánosít és sztereotipizál, elfogult vagy egyoldalú képet nyújt a társadalmat alkotó csoportokról.",
        ],
      },
    ],
  },
  {
    title: "Oktatja, neveli és szórakoztatja az állampolgárokat",
    list: [
      {
        subtitle: "oktat",
        paragraphs: [
          "A jó újságírás beszámol az egészséggel, természettel és környezettel kapcsolatos dolgokról, a fontosabb tudományos felfedezésekről, a tudomány fejlődéséről.",
        ],
      },
      {
        subtitle: "nevel",
        paragraphs: [
          "A jó újságírás értéket ad, segíti az egyén fejlődését, boldogulását és a társadalom hasznos, építő tagjává való válását."
        ],
      },
      {
        subtitle: "művel",
        paragraphs: [
          "A jó újságírás tudósít a művészet, a kultúra, a sport, a hitélet, a közélet és a közösség kiemelkedő teljesítményeiről, eseményeiről.",
        ],
      },
      {
        subtitle: "tájékozottá tesz",
        paragraphs: [
          "A jó újságírás nyomon követi és hírt ad az emberek napi életét befolyásoló eseményekről és változásokról, gazdasági fejleményekről, jogi és államigazgatási ügyekről.",
        ],
      },
      {
        subtitle: "olvasmányos",
        paragraphs: ["A jó újságírás jól szerkesztett, szellemes, nyelvezetében eredeti és élvezetes olvasni."],
      },
      {
        subtitle: "elgondolkodtató",
        paragraphs: ["A jó újságírás olyat témákkal is foglalkozik, amelyek elgondolkodtatják az olvasót."],
      },
      {
        subtitle: "inspiráló",
        paragraphs: [
          "A jó újságírás művészeti, kulturális, közösségi programokat ajánl, ötleteket ad a szabadidő eltöltéséhez és különböző élethelyzetekhez."
        ],
      },
      {
        subtitle: "szórakoztató",
        paragraphs: [
          "A jó újságírás művészeti, kulturális, közösségi programokat ajánl, ötleteket ad a szabadidő eltöltéséhez és különböző élethelyzetekhez."
        ],
      },
    ],
  },
];
