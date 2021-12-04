import { InferGetServerSidePropsType } from "next";
import { emptySticker } from "../src/models";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Sticker, GeneratorMode } from "../src/models";
import { getUrlForSticker } from "../src/helpers";
import CopyToClipboard from "react-copy-to-clipboard";
import { ContentCopy, Done, Facebook } from "@mui/icons-material";

export async function getServerSideProps() {
  return { props: { sticker: emptySticker } };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Button startIcon={<Done />} variant="contained" color="secondary" size="large" fullWidth>
        Link másolása
      </Button>
      <Button
        startIcon={<Facebook />}
        variant="contained"
        sx={{ mt: 2 }}
        color="primary"
        size="large"
        fullWidth
        onClick={() => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=s`,
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
