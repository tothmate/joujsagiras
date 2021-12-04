import React from "react";
import { Grid } from "@mui/material";
import Head from "next/head";
import { Sticker, GeneratorMode } from "../src/models";
import { getSourceHostname, getUrlForSticker } from "../src/helpers";
import Preview from "./Preview";
import Arrow from "./Arrow";
import ShareBox from "./ShareBox";

export default function Viewer(props: { sticker: Sticker }) {
  const title = `HOPP! Ez ${props.sticker.reason.text}`;
  const opengraphTitle = `${title}: ${props.sticker.source.title} (${getSourceHostname(props.sticker)})`;

  return (
    <Grid container spacing={2}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={opengraphTitle} />
        <meta property="og:image" content={getUrlForSticker(props.sticker, GeneratorMode.Png)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:description" content={props.sticker.reason.details.join(" ")} />
      </Head>
      <Grid item xs={12} sm={6}>
        {/* <Preview sticker={props.sticker} useCanvas={false} /> */}
      </Grid>
      <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Arrow />
      </Grid>
      <Grid item xs={12} sm={5}>
        <ShareBox sticker={props.sticker} />
      </Grid>
    </Grid>
  );
}
