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
  typography: {
    fontFamily: "PT Sans, sans-serif",
    h1: {
      fontFamily: "Oswald, sans-serif",
      fontSize: "2rem",
      textTransform: "uppercase",
    },
    body1: {
      fontSize: "1.2rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "black",
        },
      },
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
