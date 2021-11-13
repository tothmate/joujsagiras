import DropdownList, { DropdownListItem } from "../../components/dropdownList";
import Layout from "../../components/layout";
import { attributes } from "../../attributes";
import { useCallback } from "react";
import { useRouter } from "next/dist/client/router";
import { foldAccents } from "../../utils";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

const slugs = new Map<string, DropdownListItem>(
  attributes.flatMap((category) => category.list.map((item) => [foldAccents(item.subtitle), item]))
);

export async function getStaticPaths() {
  return {
    paths: Array.from(slugs.keys()).map((slug) => ({ params: { slug: [slug] } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: { slug: params.slug ? params.slug[0] : null },
  };
}

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const handleItemSelected = useCallback(
    (item: DropdownListItem) => {
      router.push(`/milyen/${item ? foldAccents(item.subtitle) : ""}`, undefined, { shallow: true });
    },
    [router]
  );

  return (
    <Layout>
      <DropdownList
        prefix="A jó újságírás"
        categories={attributes}
        onItemSelect={handleItemSelected}
        selectedItem={slugs.get(props.slug)}
      />
    </Layout>
  );
};

export default Page;
