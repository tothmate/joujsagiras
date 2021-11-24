import React from "react";
import { AppProps } from "next/app";
import { Box, Container } from "@mui/material";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box m={3}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </React.Fragment>
  );
}
