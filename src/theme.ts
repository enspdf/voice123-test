"use client";

import { createTheme, type PaletteMode } from "@mui/material/styles";

/**
 * Voice123 .md-theme-light palette mapped to MUI.
 * Source: --md-primary-* (gray), --md-accent-* (blue), --md-warn-* (orange), --md-background-*.
 */
const voice123Light = {
  // md-accent → MUI primary (blue: links, primary actions)
  primary: {
    main: "#2196f3",   // md-accent-color-500
    light: "#90caf9",  // md-accent-color-200
    dark: "#1565c0",   // md-accent-color-800
    contrastText: "rgba(255, 255, 255, 0.87)", // md-accent-contrast
  },
  // md-primary (gray) → MUI secondary
  secondary: {
    main: "#9e9e9e",   // md-primary-color-500
    light: "#eeeeee",  // md-primary-color-200
    dark: "#424242",   // md-primary-color-800
    contrastText: "rgba(0, 0, 0, 0.9)", // md-primary-contrast
  },
  // md-warn → MUI warning (orange CTAs)
  warning: {
    main: "#ff5722",   // md-warn-color-500
    light: "#ffab91",  // md-warn-color-200
    dark: "#d84315",   // md-warn-color-800
    contrastText: "rgba(255, 255, 255, 0.87)", // md-warn-contrast
  },
  background: {
    default: "#ffffff", // md-background-color
    paper: "#ffffff",
  },
  text: {
    primary: "rgba(0, 0, 0, 0.9)",   // md-background-contrast
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
} as const;

/** Dark mode: same hues, dark surfaces and light text. */
const voice123Dark = {
  primary: {
    main: "#42a5f5",   // accent 400 (readable on dark)
    light: "#90caf9",
    dark: "#1e88e5",
    contrastText: "rgba(255, 255, 255, 0.87)",
  },
  secondary: {
    main: "#bdbdbd",   // primary 400
    light: "#eeeeee",
    dark: "#757575",
    contrastText: "rgba(0, 0, 0, 0.9)",
  },
  warning: {
    main: "#ff7043",   // warn 400
    light: "#ffab91",
    dark: "#f4511e",
    contrastText: "rgba(255, 255, 255, 0.87)",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
  },
} as const;

export function getDesignTokens(mode: PaletteMode) {
  const palette = mode === "dark" ? voice123Dark : voice123Light;

  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: "var(--font-roboto), Roboto, sans-serif",
    },
    shape: {
      borderRadius: 8,
    },
  });
}

export type ThemeMode = PaletteMode;
