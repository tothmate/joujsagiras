import { HomeLayout } from "../components/layout";
import Marker, { PrimaryMarker, SecondaryMarker } from "../components/marker";

const Page = () => (
  <HomeLayout>
    <PrimaryMarker element="link" href="/van">
      Van
    </PrimaryMarker>
    <SecondaryMarker element="link" href="/milyen">
      Jó újságírás
    </SecondaryMarker>
  </HomeLayout>
);

export default Page;
