import React from "react";
import { Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

const MenuItem = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: "none",
  fontFamily: "Oswald, sans-serif",
  textTransform: "uppercase",
  marginRight: "0.5em",
  ":last-of-type": {
    marginRight: 0,
  },
  ":hover": {
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
}));

export default function Menu() {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <MenuItem href="/">Jó újságírás</MenuItem>
      </Grid>
      <Grid item>
        <MenuItem href="/van">Van.</MenuItem>
        <MenuItem href="/milyen">Milyen?</MenuItem>
        <MenuItem href="/hopp">Tedd szóvá!</MenuItem>
      </Grid>
    </Grid>
  );
}
