import { Box, Button, Icon, Link, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getDescriptiveTitle, getLanguageFromSlug, getUrlForSticker, track } from "../src/helpers";
import { GeneratorMode, Sticker } from "../src/models";

function linkify(text: string) {
  const matchingLink = text?.match(/(good journalism|jó újságírás)/i);

  if (matchingLink) {
    const parts = text.split(matchingLink[1], 2);
    return [
      parts[0],
      <Link key="link" href="https://joujsagiras.hu/milyen">
        {matchingLink[1]}
      </Link>,
      parts[1],
    ];
  }

  return [text];
}

export default function ShareBox(props: { sticker: Sticker }) {
  const { t } = useTranslation();
  const [copiedLink, setCopiedLink] = useState(false);
  const link = getUrlForSticker(props.sticker, GeneratorMode.Share);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {getDescriptiveTitle(props.sticker.reason.text, getLanguageFromSlug(props.sticker.reason.slug))}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {props.sticker.explanation || t("share.description1")}
      </Typography>
      <Typography variant="h1" gutterBottom>
        {t("share.description2")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {linkify(props.sticker.reason.details)}
      </Typography>
      <Box sx={{ displayPrint: "none" }}>
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
            {t("share.copy")}
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
          {t("share.share")}
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
          {t("share.new")}
        </Button>
      </Box>
    </>
  );
}
