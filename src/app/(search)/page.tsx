import { Suspense } from "react";
import { getAttributes } from "@/features/attributes/api/attributesApi";
import { searchProviders } from "@/features/search/api/searchApi";
import SearchView, {
  SearchViewFallback,
} from "@/features/search/views/search-view";

export default async function SearchPage() {
  const [attributes, providers] = await Promise.all([
    getAttributes(),
    searchProviders("", 1, { aggregations: true }),
  ]);

  return (
    <Suspense fallback={<SearchViewFallback />}>
      <SearchView attributes={attributes} providers={providers} />
    </Suspense>
  );
}
