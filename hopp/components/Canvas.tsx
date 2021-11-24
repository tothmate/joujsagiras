import React from "react";
import { Card, CardContent, CardMedia, Typography, Link, Box, CircularProgress, Fade } from "@mui/material";
import { Sticker } from "../src/models";
import Overlay from "./Overlay";

export default function Canvas(props: { sticker: Sticker; loadingSource: boolean }) {
  const hasOverlay = props.sticker.reason.text !== "";
  return (
    <Card>
      {(!props.sticker.source.image || props.loadingSource) && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="200px"
          sx={{ backgroundColor: "#fafafa" }}
        >
          <CircularProgress size="1em" />
        </Box>
      )}
      <div style={{ position: "relative" }}>
        {props.sticker.source.image && !props.loadingSource && (
          <CardMedia
            sx={{ height: "200px", filter: hasOverlay ? "grayscale(60%)" : "none" }}
            image={props.sticker.source.image}
            title={props.sticker.source.title}
          />
        )}
        <Fade in={hasOverlay}>
          <Box sx={{ position: "absolute", bottom: 0, left: "-3px", right: "-3px" }}>
            <Overlay sticker={props.sticker} />
          </Box>
        </Fade>
      </div>
      {!props.loadingSource && (
        <CardContent
          sx={{
            padding: "6px 12px",
            "&:last-child": {
              paddingBottom: "6px",
            },
          }}
        >
          <Link
            href={props.sticker.source.url}
            underline="hover"
            sx={{ textTransform: "uppercase", fontSize: "0.75em", color: "#616161" }}
            variant="body2"
            noWrap
          >
            {new URL(props.sticker.source.url).hostname}
          </Link>
          <Typography gutterBottom variant="subtitle2" component="h3">
            {props.sticker.source.title}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
