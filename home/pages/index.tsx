import Marker from "../components/marker";

const Page = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontSize: "9vw",
      maxWidth: "1024px",
      margin: "0 auto",
      whiteSpace: "nowrap",
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
