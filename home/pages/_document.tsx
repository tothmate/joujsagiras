import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="hu">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
