import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
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
        <Canvas sticker={props.sticker} loadingSource={false} />
        <Grid container justifyContent="space-between" mt={2}>
          <Grid item>
            <CopyToClipboard
              text={link}
              onCopy={() => {
                setCopiedLink(true);
                setTimeout(() => {
                  setCopiedLink(false);
                }, 2000);
              }}
            >
              <Button variant="outlined" color={copiedLink ? "success" : "secondary"} size="large">
                Link másolása
              </Button>
            </CopyToClipboard>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" size="large" onClick={downloadPng}>
              Kép letöltése
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1580 1620" style={{ width: "100%" }}>
          <g fill="#000000">
            <g>
              <path d="M138 1378 c-53 -47 -61 -102 -29 -209 11 -35 29 -99 40 -142 40 -148 85 -207 158 -207 36 0 89 33 98 59 3 12 9 21 13 21 4 0 44 -31 90 -69 128 -106 286 -216 540 -376 128 -80 238 -148 245 -150 10 -5 109 138 119 172 2 6 -98 75 -222 153 -345 218 -477 312 -650 470 l-55 49 43 1 42 0 0 114 0 115 -152 5 c-84 3 -175 8 -203 11 -43 5 -54 3 -77 -17z"></path>
            </g>
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
        <Button variant="contained" color="primary" size="large" fullWidth>
          Megosztás
        </Button>
      </Grid>
    </Grid>
  );
}
