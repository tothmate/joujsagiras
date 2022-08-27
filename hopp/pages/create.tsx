import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Editor from "../components/Editor";
import store from "../src/SupabaseStore";

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
}

export default function Page() {
  return <Editor store={store} />;
}
