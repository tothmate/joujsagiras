import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import { GeneratorMode, Sticker } from "../src/models";
import { getSourceHostname, getUrlForSticker } from "../src/helpers";
import { drawPreview } from "../src/canvas";

export default function Preview(props: { sticker: Sticker; useCanvas: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && window.devicePixelRatio) {
      canvasRef.current.width *= window.devicePixelRatio;
      canvasRef.current.height *= window.devicePixelRatio;
    }
  }, []);

  useEffect(() => {
    const ctx = canvasRef?.current?.getContext("2d");
    if (ctx) {
      drawPreview(ctx, props.sticker.source.image, props.sticker.reason.text);
    }
  });

  return (
    <Card>
      {props.useCanvas && (
        <CardMedia sx={{ lineHeight: 0 }}>
          <canvas ref={canvasRef} style={{ width: "100%", aspectRatio: "16/9" }} />
        </CardMedia>
      )}
      {!props.useCanvas && (
        <CardMedia
          image={getUrlForSticker(props.sticker, GeneratorMode.Png)}
          title={props.sticker.source.title}
          style={{ width: "100%", aspectRatio: "16/9" }}
        />
      )}
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
    </Card>
  );
}
