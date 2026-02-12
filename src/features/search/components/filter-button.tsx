"use client";

import { IconButton, Button, Badge, useTheme, alpha } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface FilterButtonProps {
  onClick: () => void;
  activeCount?: number;
  /** If true, render as icon-only button; otherwise button with label */
  variant?: "icon" | "button";
}

export const FilterButton = ({
  onClick,
  activeCount = 0,
  variant = "button",
}: FilterButtonProps) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const icon = (
    <Badge
      badgeContent={activeCount}
      color="secondary"
      max={99}
      showZero={false}
    >
      <FilterListIcon />
    </Badge>
  );

  if (variant === "icon") {
    return (
      <IconButton
        onClick={onClick}
        aria-label={`Open filters${activeCount > 0 ? ` (${activeCount} active)` : ""}`}
        sx={{
          bgcolor: alpha(primary, 0.12),
          "&:hover": {
            bgcolor: alpha(primary, 0.2),
          },
        }}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outlined"
      size="medium"
      startIcon={icon}
      aria-label={`Open filters${activeCount > 0 ? ` (${activeCount} active)` : ""}`}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        borderColor: alpha(primary, 0.5),
        color: primary,
        "&:hover": {
          borderColor: primary,
          bgcolor: alpha(primary, 0.08),
        },
      }}
    >
      Filters
    </Button>
  );
};
