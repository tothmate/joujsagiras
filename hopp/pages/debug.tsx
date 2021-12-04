import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ErrorPage from "next/error";
import Viewer from "../components/Viewer";
import { emptySticker, StickerStoreErrorType } from "../src/models";
import store from "../src/SupabaseStore";

export async function getServerSideProps({ res, query }: GetServerSidePropsContext) {
  return { props: { sticker: emptySticker, error: null } };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Viewer sticker={props.sticker} />;
}
