import React, { useState } from "react";
import { Button, Icon, Typography } from "@mui/material";
import { Sticker, GeneratorMode } from "../src/models";
import { getUrlForSticker } from "../src/helpers";
import CopyToClipboard from "react-copy-to-clipboard";

export default function ShareBox(props: { sticker: Sticker }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const link = getUrlForSticker(props.sticker, GeneratorMode.Share);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        HOPP! Ez {props.sticker.reason.text}.
      </Typography>
      <Typography variant="body2" gutterBottom>
        {props.sticker.explanation || "Hogy miért baj ez?"}
      </Typography>
      <Typography variant="h1" gutterBottom>
        Ez nem jó újságírás.
      </Typography>
      {props.sticker.reason.details.map((detail) => (
        <Typography variant="body2" gutterBottom key={detail}>
          {detail}
        </Typography>
      ))}
      <CopyToClipboard
        text={link}
        onCopy={() => {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
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
        }}
      >
        Megosztás
      </Button>
    </>
  );
}
