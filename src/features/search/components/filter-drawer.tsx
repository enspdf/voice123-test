"use client";

import {
  Drawer,
  Box,
  Typography,
  FormControl,
  Divider,
  Chip,
  Button,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAttributesStore } from "@/features/attributes/store/attributes-store";
import type { AttributeValueSlim } from "@/features/attributes/api/types";
import type { SearchFilterState } from "@/features/search/components/filter-sidebar";

const DRAWER_WIDTH = 360;

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onReset: () => void;
}

function getActiveFiltersCount(filters: SearchFilterState): number {
  return Object.values(filters).reduce((sum, ids) => sum + ids.length, 0);
}

export function FilterDrawer({
  open,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: FilterDrawerProps) {
  const attributes = useAttributesStore((s) => s.attributes);

  const handleAttributeChange = (
    attributeName: string,
    selectedValues: AttributeValueSlim[],
  ) => {
    const valueIds = selectedValues.map((v) => v.id);
    onFilterChange({ ...filters, [attributeName]: valueIds });
  };

  const activeCount = getActiveFiltersCount(filters);

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
            onClick={onReset}
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
          {attributes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No filters available yet.
            </Typography>
          ) : (
            attributes.map((attr, index) => {
              const selectedIds = filters[attr.name] ?? [];
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
                    options={attr.values}
                    value={selectedValues}
                    onChange={(__, nextValue) => {
                      handleAttributeChange(attr.name, nextValue);
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
                  {index < attributes.length - 1 && (
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
}
