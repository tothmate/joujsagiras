import { ok } from "neverthrow";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ErrorPage from "next/error";
import Viewer from "../../../components/Viewer";
import { getLanguageFromSlug } from "../../../src/helpers";
import { emptySticker, Sticker, StickerStoreErrorType } from "../../../src/models";
import store from "../../../src/SupabaseStore";

export async function getServerSideProps({ res, query }: GetServerSidePropsContext) {
  const result = await store.load(query.stickerId as string);
  const translations = await serverSideTranslations(getLanguageFromSlug(query.reasonSlug as string), ["common"]);
  return result
    .asyncMap(async (sticker: Sticker) => {
      const moreStickers = (await store.loadMoreStickers(sticker)).unwrapOr([]);
      return ok({ sticker, moreStickers });
    })
    .match(
      (result) => {
        const { sticker, moreStickers } = result.unwrapOr({ sticker: emptySticker, moreStickers: [] });
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=2678400");
        return { props: { sticker, moreStickers, error: null, ...translations } };
      },
      (error) => {
        return { props: { sticker: emptySticker, moreStickers: [emptySticker], error, ...translations } };
      }
    );
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();

  if (props.error?.type === StickerStoreErrorType.NotFound) {
    return <ErrorPage statusCode={404} title={t("error.not-found")} />;
  } else if (props.error) {
    return <ErrorPage statusCode={500} title={t("error.error", { error: props.error?.message })} />;
  }

  return <Viewer sticker={props.sticker} moreStickers={props.moreStickers} />;
}
