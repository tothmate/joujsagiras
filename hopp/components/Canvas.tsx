import React from "react";
import { Card, CardContent, CardMedia, Typography, Link, Box } from "@mui/material";
import { Sticker } from "../src/models";
import Overlay from "./Overlay";
import { getSourceHostname } from "../src/helpers";

export default function Canvas(props: { sticker: Sticker; noCardContent?: boolean }) {
  const hasOverlay = props.sticker.reason.text !== "";
  return (
    <Card elevation={props.noCardContent ? 0 : 1}>
      {!props.sticker.source.image && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="200px"
          sx={{ backgroundColor: (theme) => theme.palette.grey[500] }}
        ></Box>
      )}
      <div style={{ position: "relative" }}>
        {props.sticker.source.image && (
          <CardMedia
            sx={{ height: "200px", filter: hasOverlay ? "grayscale(60%)" : "none" }}
            image={props.sticker.source.image}
            title={props.sticker.source.title}
          />
        )}
        <Box
          sx={{ display: hasOverlay ? "block" : "none", position: "absolute", bottom: 0, left: "-3px", right: "-3px" }}
        >
          <Overlay sticker={props.sticker} />
        </Box>
      </div>
      {!props.noCardContent && (
        <CardContent
          sx={{
            padding: "0 12px",
            "&:last-child": {
              paddingBottom: "6px",
            },
            backgroundColor: (theme) => theme.palette.grey[100],
          }}
        >
          <Link
            href={props.sticker.source.url}
            underline="hover"
            sx={(theme) => ({ textTransform: "uppercase", fontSize: "0.7em", color: theme.palette.text.secondary })}
            variant="body2"
            noWrap
            target="_blank"
          >
            {getSourceHostname(props.sticker)}
          </Link>
          <Typography variant="subtitle1" component="h3" fontWeight="bold" lineHeight="1.5em">
            {props.sticker.source.title}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
