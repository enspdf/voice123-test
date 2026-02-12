"use client";

import {
  Drawer,
  Box,
  Typography,
  Divider,
  Chip,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useShallow } from "zustand/react/shallow";
import { useAttributesStore } from "@/features/attributes/store/attributes-store";
import type { AttributeValueSlim } from "@/features/attributes/api/types";
import {
  useFiltersStore,
  FILTER_KEYS,
  getActiveFiltersCount,
  type FilterKey,
  type FiltersStateFilterKeys,
} from "@/features/search/store/filters-store";
import { useSearchStore } from "@/features/search/store/search-store";

const DRAWER_WIDTH = 360;

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

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const FilterDrawer = ({ open, onClose }: FilterDrawerProps) => {
  const attributes = useAttributesStore((s) => s.attributes);
  const filtersState = useFiltersStore(useShallow(filtersStateSelector));
  const setFilterIds = useFiltersStore((s) => s.setFilterIds);
  const getFilterIds = useFiltersStore((s) => s.getFilterIds);
  const resetFilters = useFiltersStore((s) => s.resetFilters);
  const isFetching = useSearchStore((s) => s.isFetching);

  const handleAttributeChange = (
    attributeName: FilterKey,
    selectedValues: AttributeValueSlim[],
  ) => {
    setFilterIds(
      attributeName,
      selectedValues.map((v) => v.id),
    );
  };

  const activeCount = getActiveFiltersCount(
    filtersState as FiltersStateFilterKeys,
  );

  const attributesToShow = attributes.filter((attr) =>
    FILTER_KEYS.includes(attr.name as FilterKey),
  );

  const sectionLabelSx = {
    mb: 1.5,
    fontWeight: 700,
    color: "text.primary",
    textTransform: "uppercase" as const,
    fontSize: "0.75rem",
    letterSpacing: "0.5px",
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { sx: { bgcolor: "rgba(0,0,0,0.2)" } },
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: DRAWER_WIDTH },
          maxWidth: DRAWER_WIDTH,
          borderRadius: 0,
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FilterListIcon sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Filters
            </Typography>
            {activeCount > 0 && (
              <Chip
                label={activeCount}
                size="small"
                color="secondary"
                sx={{
                  fontWeight: 700,
                  height: 24,
                  minWidth: 24,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            )}
          </Box>
          <Button
            size="small"
            onClick={resetFilters}
            disabled={isFetching}
            startIcon={<RestartAltIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Reset
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
          }}
        >
          {attributesToShow.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No filters available yet.
            </Typography>
          ) : (
            attributesToShow.map((attr, index) => {
              const selectedIds = getFilterIds(attr.name as FilterKey);
              const selectedValues = attr.values.filter((v) =>
                selectedIds.includes(v.id),
              );

              return (
                <Box key={attr.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={sectionLabelSx}>
                    {attr.display_name}
                  </Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    disabled={isFetching}
                    options={attr.values}
                    value={selectedValues}
                    onChange={(__, nextValue) => {
                      handleAttributeChange(attr.name as FilterKey, nextValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(a, b) => a.id === b.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={`Add ${attr.display_name}...`}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            minHeight: 48,
                            alignItems: "center",
                            flexWrap: "wrap",
                            py: 0.5,
                            px: 1.5,
                          },
                        }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option.id}
                          label={option.name}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 500,
                          }}
                        />
                      ))
                    }
                  />
                  {index < attributesToShow.length - 1 && (
                    <Divider sx={{ mt: 3, borderColor: "divider" }} />
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
