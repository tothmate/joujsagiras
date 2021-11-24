import React from "react";
import { Typography } from "@mui/material";
import { Sticker } from "../src/models";

export default function Overlay(props: { sticker: Sticker }) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          backgroundColor: "#5ac8fa",
          color: "#000000",
          padding: "12px",
          textTransform: "uppercase",
          transform: "rotate(-2deg)",
          fontFamily: "Oswald, sans-serif",
        }}
      >
        <b>Hopp!</b> Ez {props.sticker.reason.text}
      </Typography>
      <div style={{ backgroundColor: "#ffffff", height: "20px", marginTop: "-12px" }}></div>
    </>
  );
}
