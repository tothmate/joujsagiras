import tinygradient from "tinygradient";
import Dropdown from "../components/dropdown";
import Layout from "../components/layout";
import { Heading1 } from "../components/marker";

const content = [
  {
    title: "Tájékoztatja a közvéleményt",
    list: [
      "tényszerű",
      "ellenőrizhető",
      "kiegyensúlyozott",
      "értelmezhető",
      "hiteles",
      "őszinte",
      "releváns",
    ],
  },
  { title: "Teret ad a vitáknak és véleményeknek", list: [] },
  { title: "Ellenőrzi a társadalomban hatalommal bírókat", list: [] },
  { title: "Feltárja az igazságot", list: [] },
  { title: "Láthatóvá tesz és felhangosít ügyeket", list: [] },
  { title: "Oktatja és neveli az állampolgárokat", list: [] },
];

const gradient = tinygradient("#5ac7fa", "#ffcc02");

const Page = () => (
  <Layout darkLogo="secondary">
    <Heading1>A jó újságírás</Heading1>

    {content.map((row, i) => (
      <Dropdown
        title={row.title}
        list={row.list}
        key={i}
        color={gradient.rgbAt(i / (content.length - 1)).toHexString()}
      />
    ))}
  </Layout>
);

export default Page;
