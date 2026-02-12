import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { NormalizedSearchResult } from "@/features/search/api/types";

type SearchState = {
  searchResult: NormalizedSearchResult | null;
  setSearchResult: (result: NormalizedSearchResult | null) => void;
  isFetching: boolean;
  setSearchFetching: (isFetching: boolean) => void;
};

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      searchResult: null,
      setSearchResult: (searchResult) => set({ searchResult }),
      isFetching: false,
      setSearchFetching: (isFetching) => set({ isFetching }),
    }),
    {
      name: "SearchStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
