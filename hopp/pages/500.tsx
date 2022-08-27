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

const ErrorPage = () => {
  const { t } = useTranslation();
  return <NextErrorComponent statusCode={500} title={t("error.error", { error: "" })} />;
};

export default ErrorPage;
