import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ac8fa",
    },
  },
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box m={3}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
