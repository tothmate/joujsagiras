import { Grid } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ErrorPage from "next/error";
import Viewer from "../../../components/Viewer";
import { emptySticker, StickerStoreErrorType } from "../../../src/models";
import store from "../../../src/SupabaseStore";

export async function getServerSideProps({ res, query }: GetServerSidePropsContext) {
  const result = await store.load(query.stickerId as string);
  return result.match(
    (sticker) => {
      res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=2678400");
      return { props: { sticker, error: null } };
    },
    (error) => {
      return { props: { sticker: emptySticker, error } };
    }
  );
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.error?.type === StickerStoreErrorType.NotFound) {
    return <ErrorPage statusCode={404} title="Nem található" />;
  } else if (props.error) {
    const title = `Hiba: ${props.error?.message}`;
    return <ErrorPage statusCode={500} title={title} />;
  }

  return <Viewer sticker={props.sticker} />;
}
