import Head from "next/head";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jó újságírás</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
