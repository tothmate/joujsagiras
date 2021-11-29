import React from "react";
import { Typography } from "@mui/material";
import { Sticker } from "../src/models";
import { Box } from "@mui/system";

export default function Overlay(props: { sticker: Sticker }) {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          backgroundColor: "#5ac8fa",
          padding: "12px",
          transform: "rotate(-2deg)",
        }}
      >
        <b>HOPP!</b> Ez {props.sticker.reason.text}.
      </Typography>
      <Box sx={{ backgroundColor: (theme) => theme.palette.grey[100], height: "20px", marginTop: "-12px" }}></Box>
    </>
  );
}
