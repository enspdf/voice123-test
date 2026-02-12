"use client";

import { useState } from "react";
import { Box, Typography, Chip, useTheme, alpha } from "@mui/material";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { AudioWavesCanvas } from "@/components/audio-waves-canvas";
import { SearchBar } from "@/features/search/components/search-bar";
import { POPULAR_SEARCHES } from "@/features/search/constants";

export interface SearchHeroProps {
  /** Renders to the left of the search bar (e.g. filter button) */
  slotLeftOfSearchBar?: React.ReactNode;
}

export const SearchHero = ({ slotLeftOfSearchBar }: SearchHeroProps = {}) => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const bgDefault = theme.palette.background.default;
  const paper = theme.palette.background.paper;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Search:", query);
  }

  return (
    <Box
      component="main"
      sx={{
        position: "relative",
        minHeight: "100vh",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(90deg, ${alpha(primaryLight, 0.18)} 0%, ${alpha(primary, 0.22)} 40%, ${alpha(primary, 0.12)} 100%), ${bgDefault}`
          : `linear-gradient(90deg, ${alpha(primaryLight, 0.35)} 0%, ${alpha(primary, 0.2)} 50%, ${alpha(primary, 0.08)} 100%), ${bgDefault}`,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <AudioWavesCanvas />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: isDark
            ? `radial-gradient(ellipse 90% 80% at 50% 45%, transparent 40%, ${alpha(bgDefault, 0.5)} 85%, ${alpha(bgDefault, 0.85)} 100%)`
            : `radial-gradient(ellipse 90% 80% at 50% 45%, transparent 30%, ${alpha(paper, 0.35)} 70%, ${alpha(paper, 0.82)} 100%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 3 },
          py: 2,
          zIndex: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: alpha(primary, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RecordVoiceOverRoundedIcon
              sx={{ color: "primary.main", fontSize: 24 }}
            />
          </Box>
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            sx={{ letterSpacing: "-0.02em" }}
          >
            Voice123
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: "24px",
              border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
              bgcolor: isDark ? alpha(paper, 0.5) : alpha(paper, 0.9),
              color: "text.secondary",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <TrendingUpRoundedIcon sx={{ fontSize: 20 }} />
            <span>Trending</span>
          </Box>
          <ThemeModeToggle />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: 720,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 4 },
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          fontWeight={700}
          textAlign="center"
          color="text.primary"
          letterSpacing="-0.03em"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "2.75rem" },
            mb: 1.5,
          }}
        >
          Discover amazing voices
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{
            maxWidth: 440,
            mb: 4,
            lineHeight: 1.6,
            fontSize: "1.0625rem",
          }}
        >
          Search through thousands of voice actors and find exactly what you
          need
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {slotLeftOfSearchBar != null ? (
            <Box sx={{ flexShrink: 0 }}>{slotLeftOfSearchBar}</Box>
          ) : null}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onClear={() => setQuery("")}
              placeholder="Search for voice style, language, or keyword..."
              onSubmit={handleSubmit}
            />
          </Box>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mt: 3,
            mb: 1.5,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}
        >
          Popular searches
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1.25,
          }}
        >
          {POPULAR_SEARCHES.map((label) => (
            <Chip
              key={label}
              label={label}
              size="medium"
              variant="outlined"
              onClick={() => setQuery(label)}
              sx={{
                borderRadius: 3,
                borderColor: alpha(theme.palette.divider, isDark ? 0.6 : 0.5),
                color: "text.secondary",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  bgcolor: alpha(primary, isDark ? 0.12 : 0.08),
                },
              }}
            />
          ))}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 4,
            textAlign: "center",
            maxWidth: 360,
            opacity: 0.9,
          }}
        >
          Professional voice actors · Any language · Ready for your project
        </Typography>
      </Box>
    </Box>
  );
};
