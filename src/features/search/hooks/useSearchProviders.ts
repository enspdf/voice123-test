import { useQuery } from "@tanstack/react-query";
import {
  searchProviders,
  type SearchProvidersOptions,
} from "@/features/search/api/searchApi";
import type { NormalizedSearchResult } from "@/features/search/api/types";

export const searchProvidersQueryKey = (
  keywords: string,
  page: number,
  options?: SearchProvidersOptions,
) => ["search", "providers", keywords.trim(), page, options] as const;

export const useSearchProviders = (
  keywords: string,
  page: number,
  options?: SearchProvidersOptions & { enabled?: boolean },
) => {
  const { enabled = true, ...apiOptions } = options ?? {};

  return useQuery<NormalizedSearchResult>({
    queryKey: searchProvidersQueryKey(keywords, page, apiOptions),
    queryFn: () => searchProviders(keywords, page, apiOptions),
    enabled: enabled && keywords.trim().length > 0,
  });
};
