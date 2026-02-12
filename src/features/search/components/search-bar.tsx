"use client";

import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  onSubmit?: (e: React.FormEvent) => void;
  disabled?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search for products, categories, or brands...",
  onSubmit,
  disabled = false,
}: SearchBarProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondary = theme.palette.secondary.main;
  const gradientBorder = `linear-gradient(135deg, ${primary}, ${primaryDark}, ${secondary})`;
  const gradientIconBox = `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`;
  const inputBg = isDark ? theme.palette.background.paper : "#ffffff";

  return (
    <Box
      component={onSubmit ? "form" : "div"}
      onSubmit={onSubmit}
      sx={{
        position: "relative",
        width: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: -2,
          borderRadius: "24px",
          padding: "2px",
          background: gradientBorder,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: isDark ? 0.8 : 0.6,
        },
      }}
    >
      <Box
        sx={{
          background: inputBg,
          borderRadius: "24px",
          boxShadow: isDark
            ? `0 20px 60px ${alpha(theme.palette.common.black, 0.4)}, 0 0 0 1px ${alpha(theme.palette.common.white, 0.06)}`
            : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: isDark
              ? `0 24px 70px ${alpha(primary, 0.2)}, 0 0 0 1px ${alpha(primary, 0.15)}`
              : `0 24px 70px ${alpha(primary, 0.25)}, 0 0 0 1px rgba(255, 255, 255, 0.8)`,
            transform: "translateY(-2px)",
          },
          "&:focus-within": {
            boxShadow: isDark
              ? `0 24px 70px ${alpha(primary, 0.3)}, 0 0 0 2px ${primary}`
              : `0 24px 70px ${alpha(primary, 0.3)}, 0 0 0 2px ${primary}`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <TextField
          fullWidth
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: gradientIconBox,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: -1,
                    mr: 1,
                  }}
                >
                  <SearchIcon sx={{ color: "white", fontSize: 24 }} />
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {value ? (
                  <IconButton
                    onClick={onClear}
                    edge="end"
                    size="small"
                    disabled={disabled}
                    sx={{
                      mr: 1,
                      background: alpha(primary, 0.1),
                      "&:hover": {
                        background: alpha(primary, 0.2),
                      },
                    }}
                    aria-label="clear search"
                  >
                    <ClearIcon sx={{ color: primary }} />
                  </IconButton>
                ) : null}
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  disableElevation
                  disabled={disabled}
                  startIcon={<SearchIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    mr: 1.5,
                    borderRadius: 2,
                    px: 2,
                    py: 1.25,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.9375rem",
                    background: gradientIconBox,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${primaryDark} 0%, ${primary} 100%)`,
                    },
                  }}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              py: 1,
              fontSize: "1.125rem",
              fontWeight: 500,
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              py: 2,
            },
            "& .MuiInputBase-input::placeholder": {
              color: alpha(theme.palette.text.primary, 0.4),
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};
