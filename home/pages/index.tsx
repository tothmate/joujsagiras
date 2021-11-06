import Marker from "../components/marker";

const Page = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontSize: "5em",
    }}
  >
    <Marker primary element="link" href="/van">
      Van
    </Marker>
    <Marker secondary element="link" href="/milyen">
      Jó újságírás
    </Marker>
  </div>
);

export default Page;
