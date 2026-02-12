"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import type { NormalizedSearchResult } from "@/features/search/api/types";
import { AttributesStoreHydrator } from "@/features/attributes/components/attributes-store-hydrator";
import { SearchStoreHydrator } from "@/features/search/components/search-store-hydrator";
import { SearchHero } from "@/features/search/components/search-hero";
import { FilterDrawer } from "@/features/search/components/filter-drawer";
import { FilterButton } from "@/features/search/components/filter-button";
import { FiltersUrlSync } from "@/features/search/components/filters-url-sync";
import { SearchQuerySync } from "@/features/search/components/search-query-sync";
import { ProviderCardGrid } from "@/features/search/components/provider-card-grid";
import {
  useFiltersStore,
  getActiveFiltersCount,
  type FiltersStateFilterKeys,
} from "@/features/search/store/filters-store";
import { alpha, Box, useTheme } from "@mui/material";

type SearchViewProps = {
  attributes?: AttributesSlimResponse;
  providers?: NormalizedSearchResult | null;
};

const filtersStateSelector = (s: {
  languages: string;
  voice_age_genders: string;
  voice_types: string;
  tones: string;
}) => ({
  languages: s.languages,
  voice_age_genders: s.voice_age_genders,
  voice_types: s.voice_types,
  tones: s.tones,
});

const SearchView = ({ attributes = [], providers = null }: SearchViewProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filtersState = useFiltersStore(useShallow(filtersStateSelector));
  const activeCount = getActiveFiltersCount(
    filtersState as FiltersStateFilterKeys,
  );
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const bgDefault = theme.palette.background.default;

  const filterButton = (
    <FilterButton
      variant="icon"
      onClick={() => setDrawerOpen(true)}
      activeCount={activeCount}
    />
  );

  return (
    <AttributesStoreHydrator attributes={attributes}>
      <SearchStoreHydrator providers={providers}>
        <FiltersUrlSync />
        <SearchQuerySync />
        <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            overflow: "hidden",
            background: isDark
              ? `linear-gradient(90deg, ${alpha(primaryLight, 0.18)} 0%, ${alpha(primary, 0.22)} 40%, ${alpha(primary, 0.12)} 100%), ${bgDefault}`
              : `linear-gradient(90deg, ${alpha(primaryLight, 0.35)} 0%, ${alpha(primary, 0.2)} 50%, ${alpha(primary, 0.08)} 100%), ${bgDefault}`,
          }}
        >
          <SearchHero slotLeftOfSearchBar={filterButton} />
          <ProviderCardGrid />
        </Box>
      </SearchStoreHydrator>
    </AttributesStoreHydrator>
  );
};

export default SearchView;
