import { InferGetServerSidePropsType } from "next";
import React from "react";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";

export async function getServerSideProps() {
  return { props: {} };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Done />
    </>
  );
}
