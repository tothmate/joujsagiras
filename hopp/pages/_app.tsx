import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";
import Menu from "../components/Menu";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "PT Sans, sans-serif",
    h1: {
      fontFamily: "Oswald, sans-serif",
      fontSize: "2rem",
      textTransform: "uppercase",
    },
    body2: {
      fontSize: "1.2rem",
    },
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#000000",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "1rem",
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
        <Box m={2}>
          <Menu />
        </Box>
        <Box m={2}>
          <Component {...pageProps} />
        </Box>
      </Container>
      {/* Preload characters so canvas painting don't have ot wait */}
      <span style={{ fontSize: "1px", visibility: "hidden", fontFamily: theme.typography.h1.fontFamily }}>őűŐŰ</span>
    </ThemeProvider>
  );
}
