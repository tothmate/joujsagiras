import Link from "next/link";
import DropdownList, { DropdownListItem } from "../../components/dropdownList";
import Layout, { NewSectionLayout } from "../../components/layout";
import { attributes } from "../../attributes";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { foldAccents } from "../../utils";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Marker, { Heading1 } from "../../components/marker";

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
      <Layout withMenu>
        <DropdownList
          prefix="A jó újságírás"
          categories={attributes}
          onItemSelect={handleItemSelected}
          selectedItem={selectedItem}
        />
      </Layout>
      {selectedItem && (
        <>
          <NewSectionLayout isDarkSection={false}>
            <Heading1>Jó példák</Heading1>
            Még nincsenek példák.
            <br />
            <br />
            <Marker color="#ed6c03">Szeretnél részt venni a gyűjtésben? Küldj egy emailt: akos@tothmate.com</Marker>
            <br />
            <br />
            <Heading1>Rossz példák</Heading1>
            Még nincsenek példák.
            <br />
            <br />
            <Marker color="#ed6c03">Szeretnél részt venni a gyűjtésben? Küldj egy emailt: akos@tothmate.com</Marker>
            <br />
            <br />
            <Heading1>
              Láttál te is egy cikket, ami nem <i>{selectedItem.subtitle}</i>?{" "}
              <Link href="/hopp">Tedd&nbsp;szóvá!</Link>
            </Heading1>
          </NewSectionLayout>
          <NewSectionLayout isDarkSection={true}>
            <Heading1>
              Milyen még a jó újságírás? <Link href="/milyen">Katt&nbsp;ide.</Link>
            </Heading1>
          </NewSectionLayout>
        </>
      )}
    </>
  );
};

export default Page;
