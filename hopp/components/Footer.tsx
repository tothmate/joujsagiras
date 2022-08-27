import { Divider, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Trans } from "next-i18next";

const FooterText = styled(Typography)(({ theme }) => ({
  fontFamily: "Oswald, sans-serif",
  color: theme.palette.secondary.main,
  textTransform: "uppercase",
  marginTop: theme.spacing(2),
}));

export default function Footer() {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Divider variant="middle" />
        <FooterText>
          HOPP! <Trans i18nKey="footer.project" components={{ l: <Link href="/" /> }} />
        </FooterText>
      </Grid>
    </Grid>
  );
}
