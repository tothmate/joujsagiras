import { HomeLayout } from "../components/layout";
import Marker from "../components/marker";

const Page = () => (
  <HomeLayout>
    <Marker primary element="link" href="/van">
      Van
    </Marker>
    <Marker secondary element="link" href="/milyen">
      Jó újságírás
    </Marker>
  </HomeLayout>
);

export default Page;
