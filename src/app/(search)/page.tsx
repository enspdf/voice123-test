import { getAttributes } from "@/features/attributes/api/attributesApi";
import SearchView from "@/features/search/views/search-view";

export default async function SearchPage() {
  const attributes = await getAttributes();

  return (
    <>
      <SearchView attributes={attributes} />
    </>
  );
}
