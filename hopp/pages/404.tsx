import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NextErrorComponent from "next/error";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "", ["common"])),
    },
  };
};

const NotFoundPage = () => {
  const { t } = useTranslation();
  return <NextErrorComponent statusCode={404} title={t("error.not-found")} />;
};

export default NotFoundPage;
