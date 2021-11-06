import Link from "next/link";
import Explanation from "../components/explanation";
import Layout from "../components/layout";
import Marker from "../components/marker";

const Page = () => (
  <Layout darkLogo="secondary">
    <Marker element="h1">A jó újságírás</Marker>

    <Marker element="h2">Tájékoztatja a közvéleményt.</Marker>
    <Marker element="h2">Teret ad a vitáknak és véleményeknek</Marker>
    <Marker element="h2">Ellenőrzi a társadalomban hatalommal bírókat</Marker>
    <Marker element="h2">Feltárja az igazságot</Marker>
    <Marker element="h2">Láthatóvá tesz és felhangosít ügyeket</Marker>
    <Marker element="h2">Oktatja és neveli az állampolgárokat</Marker>
  </Layout>
);

export default Page;
