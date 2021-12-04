import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Sticker, GeneratorMode } from "../src/models";
import { getUrlForSticker } from "../src/helpers";
import CopyToClipboard from "react-copy-to-clipboard";
import { ContentCopy, Done, Facebook } from "@mui/icons-material";

export default function Page() {
  const [copiedLink, setCopiedLink] = useState(false);
  const link = "http://yo";

  return (
    <>
      <CopyToClipboard
        text={link}
        onCopy={() => {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        }}
      >
        <Button
          startIcon={copiedLink ? <Done /> : <ContentCopy />}
          variant="contained"
          color={copiedLink ? "success" : "secondary"}
          size="large"
          fullWidth
        >
          Link másolása
        </Button>
      </CopyToClipboard>
      <Button
        startIcon={<Facebook />}
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
