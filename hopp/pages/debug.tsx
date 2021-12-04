import { InferGetServerSidePropsType } from "next";
import { emptySticker } from "../src/models";
import React from "react";
import { Button } from "@mui/material";
import { Done, Facebook } from "@mui/icons-material";

export async function getServerSideProps() {
  return { props: {} };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Button startIcon={<Done />} variant="contained" color="secondary" size="large" fullWidth>
        Link másolása
      </Button>
      <Button startIcon={<Facebook />} variant="contained" sx={{ mt: 2 }} color="primary" size="large" fullWidth>
        Megosztás
      </Button>
    </>
  );
}
