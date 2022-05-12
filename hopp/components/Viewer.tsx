import { Grid, Link, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import { getDescriptiveTitle, getSourceHostname, getUrlForSticker } from "../src/helpers";
import { GeneratorMode, Sticker } from "../src/models";
import Arrow from "./Arrow";
import Preview from "./Preview";
import ShareBox from "./ShareBox";

export default function Viewer(props: { sticker: Sticker; moreStickers: Sticker[] }) {
  const title = getDescriptiveTitle(props.sticker.reason.text);
  const opengraphTitle = `${title}: ${props.sticker.source.title} (${getSourceHostname(props.sticker)})`;

  return (
    <Grid container spacing={2}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={opengraphTitle} />
        <meta property="og:image" content={getUrlForSticker(props.sticker, GeneratorMode.Jpg)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:description" content={props.sticker.reason.details} />
      </Head>
      <Grid item xs={12} sm={6}>
        <Preview sticker={props.sticker} useCanvas={false} />
      </Grid>
      <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
        <Arrow />
      </Grid>
      <Grid item xs={12} sm={5}>
        <ShareBox sticker={props.sticker} />
      </Grid>
      {props.moreStickers.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="body2">Más bejelentett cikkek:</Typography>
        </Grid>
      )}
      {props.moreStickers.map((sticker) => (
        <Grid item xs={6} sm={3} key={sticker.id}>
          <Link href={getUrlForSticker(sticker, GeneratorMode.Share)} sx={{ textDecoration: "none" }}>
            <Typography fontSize={10}>
              <Preview sticker={sticker} useCanvas={false} />
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
