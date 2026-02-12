"use client";

import { useEffect } from "react";
import type { NormalizedSearchResult } from "@/features/search/api/types";
import { useSearchStore } from "@/features/search/store/search-store";

type SearchStoreHydratorProps = {
  providers: NormalizedSearchResult | null;
  children: React.ReactNode;
};

export const SearchStoreHydrator = ({
  providers,
  children,
}: SearchStoreHydratorProps) => {
  useEffect(() => {
    useSearchStore.getState().setSearchResult(providers);
  }, [providers]);

  return <>{children}</>;
};
