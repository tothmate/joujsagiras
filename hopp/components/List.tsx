import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { getUrlForSticker } from "../src/helpers";
import { GeneratorMode, Sticker } from "../src/models";
import Preview from "./Preview";

export default function List(props: { stickers: Sticker[] }) {
  return (
    <Grid container spacing={2}>
      {props.stickers.map((sticker) => (
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
