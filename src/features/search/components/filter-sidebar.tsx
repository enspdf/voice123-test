"use client";

import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAttributesStore } from "@/features/attributes/store/attributes-store";

/** Selected value IDs per attribute name (e.g. { languages: [10, 20], genders: [1] }) */
export type SearchFilterState = Record<string, number[]>;

export const DEFAULT_SEARCH_FILTERS: SearchFilterState = {};

interface FilterSidebarProps {
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onReset: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const attributes = useAttributesStore((s) => s.attributes);

  const handleValueToggle = (attributeName: string, valueId: number) => {
    const current = filters[attributeName] ?? [];
    const next = current.includes(valueId)
      ? current.filter((id) => id !== valueId)
      : [...current, valueId];
    onFilterChange({ ...filters, [attributeName]: next });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((sum, ids) => sum + ids.length, 0);
  };

  const activeCount = getActiveFiltersCount();

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        p: 3,
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        position: "sticky",
        top: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterListIcon sx={{ color: "white", fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filters
          </Typography>
          {activeCount > 0 && (
            <Chip
              label={activeCount}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                color: "white",
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
            color: "#667eea",
            "&:hover": {
              background: "rgba(102, 126, 234, 0.1)",
            },
          }}
        >
          Reset
        </Button>
      </Box>

      <Divider sx={{ mb: 3, borderColor: "rgba(0, 0, 0, 0.08)" }} />

      {attributes.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No filters available yet.
        </Typography>
      ) : (
        attributes.map((attr, index) => (
          <Box key={attr.id}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                fontWeight: 700,
                color: "#1e293b",
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              {attr.display_name}
            </Typography>
            <FormGroup>
              {attr.values.map((value) => {
                const selected = (filters[attr.name] ?? []).includes(value.id);
                return (
                  <FormControlLabel
                    key={value.id}
                    control={
                      <Checkbox
                        checked={selected}
                        onChange={() => handleValueToggle(attr.name, value.id)}
                        sx={{
                          color: "#667eea",
                          "&.Mui-checked": {
                            color: "#667eea",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#64748b" }}
                      >
                        {value.name}
                      </Typography>
                    }
                    sx={{ mb: 0.5 }}
                  />
                );
              })}
            </FormGroup>
            {index < attributes.length - 1 && (
              <Divider sx={{ my: 3, borderColor: "rgba(0, 0, 0, 0.08)" }} />
            )}
          </Box>
        ))
      )}
    </Box>
  );
}
