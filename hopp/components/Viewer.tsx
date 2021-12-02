import React, { useState } from "react";
import { Button, Grid, Typography, Link } from "@mui/material";
import Head from "next/head";
import { Sticker, GeneratorMode } from "../src/models";
import { getUrlForSticker } from "../src/helpers";
import Canvas from "./Canvas";
import CopyToClipboard from "react-copy-to-clipboard";
import Arrow from "./Arrow";

export default function Viewer(props: { sticker: Sticker }) {
  const title = `HOPP! Ez ${props.sticker.reason.text}.`;

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
    <Grid container spacing={2}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:image" content={getUrlForSticker(props.sticker, GeneratorMode.Png)} key="image" />
      </Head>
      <Grid item xs={12} sm={6}>
        <Canvas sticker={props.sticker} />
      </Grid>
      <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Arrow />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Typography variant="h1" gutterBottom>
          HOPP! Ez {props.sticker.reason.text}.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {props.sticker.explanation || "Hogy miért baj ez?"}
        </Typography>
        <Typography variant="h1" gutterBottom>
          Ez nem jó újságírás.
        </Typography>
        {props.sticker.reason.details.map((detail) => (
          <Typography variant="body1" gutterBottom key={detail}>
            {detail}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={6} sm={3}>
        <CopyToClipboard
          text={link}
          onCopy={() => {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
          }}
        >
          <Button variant="contained" color={copiedLink ? "success" : "secondary"} size="large" fullWidth>
            Link másolása
          </Button>
        </CopyToClipboard>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Button variant="contained" color="secondary" size="large" onClick={downloadPng} fullWidth>
          Kép letöltése
        </Button>
      </Grid>
      <Grid item xs={0} sm={1} />
      <Grid item xs={12} sm={5}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={(e) => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${link}`,
              "",
              "width=550, height=400, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
            );
          }}
        >
          Megosztás
        </Button>
      </Grid>
    </Grid>
  );
}
