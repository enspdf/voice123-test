import { getAttributes } from "@/features/attributes/api/attributesApi";
import { searchProviders } from "@/features/search/api/searchApi";
import SearchView from "@/features/search/views/search-view";

export default async function SearchPage() {
  const [attributes, providers] = await Promise.all([
    getAttributes(),
    searchProviders("", 1, { aggregations: true }),
  ]);

  return <SearchView attributes={attributes} providers={providers} />;
}
