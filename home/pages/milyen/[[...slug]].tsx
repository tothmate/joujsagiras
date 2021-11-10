import DropdownList from "../../components/dropdownList";
import Layout from "../../components/layout";
import { Heading2, Heading3 } from "../../components/marker";
import { attributes } from "../../attributes";
import { foldAccents } from "../../utils";
import Paragraph from "../../components/paragraph";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const contents = attributes.map((category) => ({
  title: category.category,
  list: category.attributes.map((attribute) => ({
    subtitle: attribute.attribute,
    slug: foldAccents(attribute.attribute),
  })),
}));

const slugs = new Map(
  attributes.flatMap((category) =>
    category.attributes.map((attribute) => [
      foldAccents(attribute.attribute),
      attribute,
    ])
  )
);

const Page = () => {
  const [selectedAttributeSlug, setSelectedAttributeSlug] = useState<
    string | null
  >(null);
  const attributeDetails = slugs.get(selectedAttributeSlug);
  const router = useRouter();
  const handleItemSelected = useCallback(
    (item: string) => {
      setSelectedAttributeSlug(item);
      router.push(`/milyen/${item}`, undefined, { shallow: true });
    },
    [router]
  );
  useEffect(() => {
    if (router.query.slug) {
      setSelectedAttributeSlug(router.query.slug[0]);
    }
  }, [router.query.slug]);

  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <Heading3>A jó újságírás</Heading3>
        {attributeDetails ? (
          <Heading2>{attributeDetails.attribute}</Heading2>
        ) : (
          <DropdownList contents={contents} onItemSelect={handleItemSelected} />
        )}
      </div>

      {attributeDetails && (
        <>
          {attributeDetails.explanation.map((explanation: string, i) => (
            <Paragraph key={i}>{explanation}</Paragraph>
          ))}
        </>
      )}
    </Layout>
  );
};

export default Page;
