import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { NormalizedSearchResult } from "@/features/search/api/types";

type SearchState = {
  searchResult: NormalizedSearchResult | null;
  setSearchResult: (result: NormalizedSearchResult | null) => void;
};

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      searchResult: null,
      setSearchResult: (searchResult) => set({ searchResult }),
    }),
    {
      name: "SearchStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
