"use client";

import { useState, useCallback, useMemo } from "react";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import { AttributesStoreHydrator } from "@/features/attributes/components/attributes-store-hydrator";
import { SearchHero } from "@/features/search/components/search-hero";
import {
  DEFAULT_SEARCH_FILTERS,
  type SearchFilterState,
} from "@/features/search/components/filter-sidebar";
import { FilterDrawer } from "@/features/search/components/filter-drawer";
import { FilterButton } from "@/features/search/components/filter-button";
import { Box } from "@mui/material";

type SearchViewProps = {
  attributes?: AttributesSlimResponse;
};

const getActiveFiltersCount = (filters: SearchFilterState): number => {
  return Object.values(filters).reduce(
    (activeFiltersCount, filters) => activeFiltersCount + filters.length,
    0,
  );
};

const SearchView = ({ attributes = [] }: SearchViewProps) => {
  const [filters, setFilters] = useState<SearchFilterState>(
    DEFAULT_SEARCH_FILTERS,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <Box>
        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleReset}
        />
        <SearchHero slotLeftOfSearchBar={filterButton} />
      </Box>
    </AttributesStoreHydrator>
  );
};

export default SearchView;
