import Head from "next/head";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jó újságírás</title>
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          src="https://analytics.joujsagiras.hu/umami.js"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
