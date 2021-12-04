import { InferGetServerSidePropsType } from "next";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";
import { emptySticker } from "../src/models";

export async function getServerSideProps() {
  return { props: { sticker: emptySticker } };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Button startIcon={<Done />} variant="contained" color="secondary" size="large" fullWidth>
      Link másolása
    </Button>
  );
}
