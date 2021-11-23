import Link from "next/link";
import DropdownList, { DropdownListItem } from "../../components/dropdownList";
import Layout, { NewSectionLayout } from "../../components/layout";
import { attributes } from "../../attributes";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { foldAccents } from "../../utils";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Heading1 } from "../../components/marker";

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
    <>
      <Layout>
        <DropdownList
          prefix="A jó újságírás"
          categories={attributes}
          onItemSelect={handleItemSelected}
          selectedItem={selectedItem}
        />
        {selectedItem?.paragraphs.map((paragraph: string, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Layout>
      {selectedItem && (
        <>
          <NewSectionLayout isDarkSection={false}>
            <Heading2>Jó példák</Heading2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Heading2>Rossz példák</Heading2>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Heading2>
              Láttál te is egy cikket, ami nem <i>{selectedItem.subtitle}</i>? <Link href="/hopp">Értékeld!</Link>
            </Heading2>
          </NewSectionLayout>
          <NewSectionLayout isDarkSection={true}>
            <Heading2>
              Milyen a még jó újságírás? <br />
              <Link href="/milyen">Katt ide.</Link>
            </Heading2>
          </NewSectionLayout>
        </>
      )}
    </>
  );
};

export default Page;
