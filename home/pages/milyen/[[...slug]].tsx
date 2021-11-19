import DropdownList, { DropdownListItem } from "../../components/dropdownList";
import Layout from "../../components/layout";
import { attributes } from "../../attributes";
import { useCallback, useEffect, useState } from "react";
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

  const [selectedItem, setSelectedItem] = useState<DropdownListItem | undefined>(slugs.get(props.slug));

  const handleItemSelected = useCallback(
    (item: DropdownListItem) => {
      setSelectedItem(item);
      router.push(`/milyen/${item ? foldAccents(item.subtitle) : ""}`, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    setSelectedItem(router.query.slug ? slugs.get(router.query.slug[0]) : undefined);
  }, [router.query.slug]);

  return (
    <Layout>
      <DropdownList
        prefix="A jó újságírás"
        categories={attributes}
        onItemSelect={handleItemSelected}
        selectedItem={selectedItem}
      />
    </Layout>
  );
};

export default Page;
