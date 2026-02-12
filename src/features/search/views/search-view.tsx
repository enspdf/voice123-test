"use client";

import { useState, useCallback, useMemo } from "react";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import type { NormalizedSearchResult } from "@/features/search/api/types";
import { AttributesStoreHydrator } from "@/features/attributes/components/attributes-store-hydrator";
import { SearchStoreHydrator } from "@/features/search/components/search-store-hydrator";
import { SearchHero } from "@/features/search/components/search-hero";
import {
  DEFAULT_SEARCH_FILTERS,
  type SearchFilterState,
} from "@/features/search/components/filter-sidebar";
import { FilterDrawer } from "@/features/search/components/filter-drawer";
import { FilterButton } from "@/features/search/components/filter-button";
import { ProviderCardGrid } from "@/features/search/components/provider-card-grid";
import { alpha, Box, useTheme } from "@mui/material";

type SearchViewProps = {
  attributes?: AttributesSlimResponse;
  providers?: NormalizedSearchResult | null;
};

const getActiveFiltersCount = (filters: SearchFilterState): number => {
  return Object.values(filters).reduce(
    (activeFiltersCount, filters) => activeFiltersCount + filters.length,
    0,
  );
};

const SearchView = ({ attributes = [], providers = null }: SearchViewProps) => {
  const [filters, setFilters] = useState<SearchFilterState>(
    DEFAULT_SEARCH_FILTERS,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const bgDefault = theme.palette.background.default;
  const paper = theme.palette.background.paper;

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_SEARCH_FILTERS);
  }, []);

  const activeCount = useMemo(() => getActiveFiltersCount(filters), [filters]);

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
        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
        />
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
