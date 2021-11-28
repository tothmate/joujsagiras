import React from "react";
import { Box, Grid, Hidden, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";
import { Sticker, GeneratorMode } from "../src/models";
import { capitalizeFirstLetter, getUrlForSticker } from "../src/helpers";
import Canvas from "./Canvas";

export default function Viewer(props: {
  sticker: Sticker;
  loadingSource: boolean;
  canEditExplanation: boolean;
  onExplanationChange?: (explanation: string) => void;
}) {
  const theme = useTheme();
  const title = `HOPP! ${capitalizeFirstLetter(props.sticker.reason.text)}`;

  return (
    <Grid container spacing={1}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta property="og:image" content={getUrlForSticker(props.sticker, GeneratorMode.Png)} key="image" />
      </Head>
      <Grid item xs={12} sm={6}>
        <Canvas sticker={props.sticker} loadingSource={props.loadingSource} />
      </Grid>
      {props.sticker.reason.text && (
        <Grid item xs={12} sm={1} sx={{ display: { xs: "none", sm: "block" } }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1580 1620" style={{ width: "100%", marginTop: "40px" }}>
            <g fill={theme.palette.text.secondary}>
              <g>
                <path d="M138 1378 c-53 -47 -61 -102 -29 -209 11 -35 29 -99 40 -142 40 -148 85 -207 158 -207 36 0 89 33 98 59 3 12 9 21 13 21 4 0 44 -31 90 -69 128 -106 286 -216 540 -376 128 -80 238 -148 245 -150 10 -5 109 138 119 172 2 6 -98 75 -222 153 -345 218 -477 312 -650 470 l-55 49 43 1 42 0 0 114 0 115 -152 5 c-84 3 -175 8 -203 11 -43 5 -54 3 -77 -17z"></path>
              </g>
            </g>
          </svg>
        </Grid>
      )}
      {props.sticker.reason.text && (
        <Grid item xs={12} sm={5}>
          <Typography variant="h6" component="h2">
            HOPP!
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Ez jól hangzik, csak {props.sticker.reason.text}.
          </Typography>
          {props.sticker.reason.details.map((detail) => (
            <Typography variant="body1" gutterBottom component="p" key={detail}>
              {detail}
            </Typography>
          ))}
          <Box mt={4}>
            {props.canEditExplanation && (
              <TextField
                label="Miért?"
                fullWidth
                multiline
                rows={4}
                value={props.sticker.explanation}
                onChange={(e) =>
                  props.onExplanationChange ? props.onExplanationChange(e.target.value as string) : null
                }
              />
            )}

            {!props.canEditExplanation && (
              <Typography variant="body1" gutterBottom component="p">
                {props.sticker.explanation}
              </Typography>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
