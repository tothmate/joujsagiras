import { InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorPage from "next/error";
import List from "../../components/List";
import { emptySticker } from "../../src/models";
import store from "../../src/SupabaseStore";

export async function getServerSideProps() {
  const result = await store.loadMoreStickers(emptySticker, 100);
  const translations = await serverSideTranslations("hu", ["common"]);
  return result.match(
    (stickers) => {
      return { props: { stickers, error: null, ...translations } };
    },
    (error) => {
      return { props: { stickers: [emptySticker], error, ...translations } };
    }
  );
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (props.error) {
    const title = `Hiba: ${props.error?.message}`;
    return <ErrorPage statusCode={500} title={title} />;
  }

  return <List stickers={props.stickers} />;
}
