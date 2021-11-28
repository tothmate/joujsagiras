import React, { useState } from "react";
import { Button, Grid, Typography, Link } from "@mui/material";
import Head from "next/head";
import { Sticker, GeneratorMode } from "../src/models";
import { getUrlForSticker } from "../src/helpers";
import Canvas from "./Canvas";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Viewer(props: { sticker: Sticker }) {
  const title = `HOPP! ${props.sticker.reason.text}.`;

  const [copiedLink, setCopiedLink] = useState(false);
  const link = getUrlForSticker(props.sticker, GeneratorMode.Share);
  const pngLink = getUrlForSticker(props.sticker, GeneratorMode.Png);

  const downloadPng = () => {
    const link = document.createElement("a");
    link.download = "hopp";
    link.href = pngLink;
    link.click();
  };

  return (
    <Grid container spacing={1}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:image" content={getUrlForSticker(props.sticker, GeneratorMode.Png)} key="image" />
      </Head>
      <Grid item xs={12} sm={6}>
        <Grid container direction="column" sx={{ height: "100%" }} justifyContent="space-between">
          <Canvas sticker={props.sticker} loadingSource={false} />
          <Grid container justifyContent="space-between" mt={2} spacing={1}>
            <Grid item flexGrow={1}>
              <CopyToClipboard
                text={link}
                onCopy={() => {
                  setCopiedLink(true);
                  setTimeout(() => {
                    setCopiedLink(false);
                  }, 2000);
                }}
              >
                <Button variant="outlined" color={copiedLink ? "success" : "secondary"} size="large" fullWidth>
                  Link másolása
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item flexGrow={1}>
              <Button variant="outlined" color="secondary" size="large" onClick={downloadPng} fullWidth>
                Kép letöltése
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1000 960 1026" style={{ width: "100%", marginTop: "10px" }}>
          <g fill="#000000" transform="scale(0.8,-0.8)">
            <path
              d="M960 1026 c-87 -36 -138 -64 -235 -130 -113 -76 -323 -284 -429 -426
-44 -58 -82 -109 -86 -113 -4 -5 -36 10 -71 32 -44 28 -66 37 -70 28 -8 -16
-43 -386 -37 -393 6 -5 348 198 348 207 0 3 -27 23 -60 43 -33 21 -60 40 -60
43 0 22 177 238 284 345 147 148 310 262 447 313 40 14 45 20 41 41 -2 13 -7
26 -11 28 -3 2 -31 -6 -61 -18z"
            />
          </g>
        </svg>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="h1" gutterBottom>
          {props.sticker.reason.text}.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.sticker.explanation}
        </Typography>
        <Typography variant="h1" gutterBottom>
          Ez nem jó újságírás.
        </Typography>
        {props.sticker.reason.details.map((detail) => (
          <Typography variant="body1" gutterBottom key={detail}>
            {detail}
          </Typography>
        ))}
        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} underline="none">
          <Button variant="contained" color="primary" size="large" fullWidth>
            Megosztás
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
