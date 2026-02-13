"use client";

import { Box, useTheme, alpha } from "@mui/material";

interface HighlightedTextProps {
  text?: string;
  term?: string;
  className?: string;
}

export const HighlightedText = ({
  text = "",
  term = "",
  className = "",
}: HighlightedTextProps) => {
  if (!term.trim()) {
    return <>{text}</>;
  }

  const tokens = term.trim().split(/\s+/).filter(Boolean);
  const escaped = tokens.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <>
      {parts.map((part, index) =>
        tokens.some((t) => part.toLowerCase() === t.toLowerCase()) ? (
          <Box
            component="mark"
            key={index}
            className={className}
            sx={{
              padding: "0 2px",
              borderRadius: 0.5,
              bgcolor: alpha(primary, 0.25),
              color: primary,
              fontWeight: 600,
            }}
          >
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </>
  );
}
