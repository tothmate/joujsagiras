import { InferGetServerSidePropsType } from "next";
import ShareBox from "../components/ShareBox";
import { emptySticker } from "../src/models";

export async function getServerSideProps() {
  return { props: {} };
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ShareBox sticker={emptySticker} />;
}
