import React, { useState } from "react";
import { Button, Icon, Link, Typography } from "@mui/material";
import { Sticker, GeneratorMode } from "../src/models";
import { getDescriptiveTitle, getUrlForSticker, track } from "../src/helpers";
import CopyToClipboard from "react-copy-to-clipboard";

function linkify(text: string) {
  const textToLink = "jó újságírás";
  const parts = text.split(textToLink, 2);
  if (parts.length == 2) {
    return [
      parts[0],
      <Link key="link" href="https://joujsagiras.hu/milyen">
        {textToLink}
      </Link>,
      parts[1],
    ];
  }

  return [text];
}

export default function ShareBox(props: { sticker: Sticker }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const link = getUrlForSticker(props.sticker, GeneratorMode.Share);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {getDescriptiveTitle(props.sticker.reason.text)}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {props.sticker.explanation || "Hogy miért baj ez?"}
      </Typography>
      <Typography variant="h1" gutterBottom>
        Ez nem jó újságírás.
      </Typography>
      <Typography variant="body2" gutterBottom>
        {linkify(props.sticker.reason.details)}
      </Typography>
      <CopyToClipboard
        text={link}
        onCopy={() => {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
          track("copy-link", "click");
        }}
      >
        <Button
          startIcon={<Icon>{copiedLink ? "check_circle" : "content_copy"}</Icon>}
          variant="contained"
          color={copiedLink ? "success" : "secondary"}
          size="large"
          fullWidth
        >
          Link másolása
        </Button>
      </CopyToClipboard>
      <Button
        startIcon={<Icon>facebook</Icon>}
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        size="large"
        fullWidth
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${link}`,
            "",
            "width=550, height=400, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
          );
          track("share-facebook", "click");
        }}
      >
        Megosztás
      </Button>
      <Button
        startIcon={<Icon>add</Icon>}
        variant="outlined"
        sx={{ mt: 2 }}
        color="primary"
        size="large"
        fullWidth
        href="/hopp"
        onClick={() => {
          track("add-new", "click");
        }}
      >
        Új cikk bejelentése
      </Button>
    </>
  );
}
