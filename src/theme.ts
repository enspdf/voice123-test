"use client";

import { createTheme, type PaletteMode } from "@mui/material/styles";

const lightPalette = {
  primary: {
    main: "#6366f1",
    light: "#818cf8",
    dark: "#4f46e5",
    contrastText: "rgba(255, 255, 255, 0.87)",
  },
  secondary: {
    main: "#ec4899",
    light: "#f472b6",
    dark: "#db2777",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff",
  },
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
    contrastText: "#ffffff",
  },
  info: {
    main: "#6366f1",
    light: "#818cf8",
    dark: "#4f46e5",
    contrastText: "rgba(255, 255, 255, 0.87)",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
} as const;

const darkPalette = {
  primary: {
    main: "#818cf8",
    light: "#a5b4fc",
    dark: "#6366f1",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  secondary: {
    main: "#f472b6",
    light: "#f9a8d4",
    dark: "#ec4899",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  background: {
    default: "#0f172a",
    paper: "#1e293b",
  },
  success: {
    main: "#34d399",
    light: "#6ee7b7",
    dark: "#10b981",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  warning: {
    main: "#fbbf24",
    light: "#fcd34d",
    dark: "#f59e0b",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  error: {
    main: "#f87171",
    light: "#fca5a5",
    dark: "#ef4444",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    main: "#818cf8",
    light: "#a5b4fc",
    dark: "#6366f1",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
} as const;

export const getDesignTokens = (mode: PaletteMode) => {
  const palette = mode === "dark" ? darkPalette : lightPalette;

  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily:
        'var(--font-inter), "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 16,
    },
  });
}

export type ThemeMode = PaletteMode;
