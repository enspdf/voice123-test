"use client";

import { IconButton, useTheme } from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useContext } from "react";
import { ThemeModeContext } from "@/app/providers/theme-provider";

export function ThemeModeToggle() {
  const theme = useTheme();
  const { toggleMode } = useContext(ThemeModeContext);
  const isDark = theme.palette.mode === "dark";

  return (
    <IconButton
      onClick={toggleMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      color="primary"
    >
      {isDark ? (
        <LightModeRoundedIcon />
      ) : (
        <DarkModeRoundedIcon />
      )}
    </IconButton>
  );
}
