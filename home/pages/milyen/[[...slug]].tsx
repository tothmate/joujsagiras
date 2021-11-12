import DropdownList, { DropdownListItem } from "../../components/dropdownList";
import Layout from "../../components/layout";
import { attributes } from "../../attributes";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { foldAccents } from "../../utils";

const slugs = new Map<string, DropdownListItem>(
  attributes.flatMap((category) => category.list.map((item) => [foldAccents(item.subtitle), item]))
);

const Page = () => {
  const router = useRouter();

  const handleItemSelected = useCallback((item: DropdownListItem) => {
    router.push(`/milyen/${item ? foldAccents(item.subtitle) : ""}`, undefined, { shallow: true });
  }, []);

  const [initialSelectedItem, setInitialSelectedItem] = useState<DropdownListItem | null>(null);
  useEffect(() => {
    setInitialSelectedItem(router.query.slug ? slugs.get(router.query.slug[0]) : null);
  }, [router.query.slug]);

  return (
    <Layout>
      <DropdownList
        prefix="A jó újságírás"
        contents={attributes}
        onItemSelect={handleItemSelected}
        initialSelectedItem={initialSelectedItem}
      />
    </Layout>
  );
};

export default Page;
