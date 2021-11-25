import React from "react";
import { Typography } from "@mui/material";
import { Sticker } from "../src/models";
import { Box } from "@mui/system";

export default function Overlay(props: { sticker: Sticker }) {
  return (
    <>
      <Typography
        variant="h4"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.default,
          padding: "12px",
          textTransform: "uppercase",
          transform: "rotate(-2deg)",
          fontFamily: "Oswald, sans-serif",
        })}
      >
        <b>Hopp!</b> Ez {props.sticker.reason.text}
      </Typography>
      <Box
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper, height: "20px", marginTop: "-12px" })}
      ></Box>
    </>
  );
}
