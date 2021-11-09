import tinygradient from "tinygradient";
import DropdownList from "../components/dropdownList";
import Layout from "../components/layout";
import { Heading1 } from "../components/marker";

const contents = [
  {
    title: "Tájékoztatja a társadalmat",
    list: [
      "igaz",
      "ellenőrizhető",
      "kiegyensúlyozott",
      "értelmezhető",
      "hiteles",
      "őszinte",
      "releváns",
    ],
  },
  { title: "Teret ad a vitáknak és véleményeknek", list: [
    "véleményt formál",
    "véleményt közzétesz",
    "megkülönbözteti a véleményt a ténytől",
    "ütköztet",
    "higgadt",
  ]
},
  { title: "Ellenőrzi a társadalomban hatalommal bírókat", list: [
    "kritikus",
    "elfogulatlan",
    "számonkér",
    "szembesít",
  ] },
  { title: "Feltárja az igazságot", list: [
    "alapos",
    "pontos",
    "megalapozott",
    "megkérdezi a másik felet",
    "méltányos",
    "eredeti",
  ] },
  { title: "Láthatóvá tesz és felhangosít ügyeket", list: [
    "felkarol ügyeket",
    "az egyént védi",
    "széles merítésű",
    "sokszínű",
    "reprezentatív",
  ] },
  { title: "Oktatja és neveli az állampolgárokat", list: [] },
];

const Page = () => (
  <Layout>
    <Heading1>A jó újságírás</Heading1>
    <DropdownList contents={contents} />
  </Layout>
);

export default Page;
