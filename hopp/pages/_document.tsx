import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="hu">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            src="https://analytics.joujsagiras.hu/umami.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
