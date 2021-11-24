import React, { useState } from "react";
import { Grid, Icon, IconButton, Link, TextField } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GeneratorMode, Sticker } from "../src/models";
import { getUrlForSticker } from "../src/helpers";

export default function ShareBox(props: { sticker: Sticker }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPngLink, setCopiedPngLink] = useState(false);
  const link = getUrlForSticker(props.sticker, GeneratorMode.Share);
  const pngLink = getUrlForSticker(props.sticker, GeneratorMode.Png);

  const downloadPng = () => {
    const link = document.createElement("a");
    link.download = "hopp";
    link.href = pngLink;
    link.click();
  };

  return (
    <Grid container alignItems="flex-end" spacing={1} justifyContent="center">
      <Grid item xs={9} sm={6}>
        <TextField
          fullWidth
          variant="standard"
          label="Link"
          InputProps={{
            readOnly: true,
          }}
          value={link}
        ></TextField>
      </Grid>
      <Grid item xs={3} sm={2}>
        <CopyToClipboard
          text={link}
          onCopy={() => {
            setCopiedLink(true);
            setTimeout(() => {
              setCopiedLink(false);
            }, 2000);
          }}
        >
          <IconButton size="small">
            <Icon fontSize="small">{copiedLink ? "check_circle" : "content_copy"}</Icon>
          </IconButton>
        </CopyToClipboard>
        <IconButton size="small">
          <Link href={link} target="_blank" color="textSecondary">
            <Icon fontSize="small">open_in_new</Icon>
          </Link>
        </IconButton>
      </Grid>
      <Grid item xs={9} sm={6}>
        <TextField
          fullWidth
          variant="standard"
          label="Kép"
          InputProps={{
            readOnly: true,
          }}
          value={pngLink}
        ></TextField>
      </Grid>
      <Grid item xs={3} sm={2}>
        <CopyToClipboard
          text={pngLink}
          onCopy={() => {
            setCopiedPngLink(true);
            setTimeout(() => {
              setCopiedPngLink(false);
            }, 2000);
          }}
        >
          <IconButton size="small">
            <Icon fontSize="small">{copiedPngLink ? "check_circle" : "content_copy"}</Icon>
          </IconButton>
        </CopyToClipboard>
        <IconButton size="small" onClick={downloadPng}>
          <Icon fontSize="small">file_download</Icon>
        </IconButton>
      </Grid>
    </Grid>
  );
}
