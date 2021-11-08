import tinygradient from "tinygradient";
import DropdownList from "../components/dropdownList";
import Layout from "../components/layout";
import { Heading1 } from "../components/marker";

const contents = [
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
  { title: "Teret ad a vitáknak és véleményeknek", list: ["asfsdfas"] },
  { title: "Ellenőrzi a társadalomban hatalommal bírókat", list: [] },
  { title: "Feltárja az igazságot", list: [] },
  { title: "Láthatóvá tesz és felhangosít ügyeket", list: [] },
  { title: "Oktatja és neveli az állampolgárokat", list: [] },
];

const Page = () => (
  <Layout darkLogo="secondary">
    <Heading1>A jó újságírás</Heading1>
    <DropdownList contents={contents} />
  </Layout>
);

export default Page;
