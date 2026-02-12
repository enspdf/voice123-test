"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { VoiceProvider } from "@/features/search/api/types";
import { Bookmark, StarOutlineOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useAttributesStore } from "@/features/attributes/store/attributes-store";
import { AudioPlayer } from "@/components/audio-player";
import { getProviderDisplayData } from "@/features/search/lib/provider-display-data";

interface ProviderCardProps {
  provider: VoiceProvider;
}

const getInitials = (name: string): string => {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const attributes = useAttributesStore((s) => s.attributes);
  const display = useMemo(
    () => getProviderDisplayData(provider, attributes),
    [provider, attributes],
  );

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: 2,
          borderColor: alpha(primary, 0.3),
          elevation: 2,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2, "&:last-child": { pb: 2 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Avatar
            src={display.picture ?? undefined}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(primary, 0.15),
              color: primary,
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            {getInitials(display.user.name)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              component={Link}
              href={`https://voice123.com/${display.user.username}`}
              prefetch={true}
              variant="subtitle1"
              fontWeight={700}
              color="text.primary"
              sx={{
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {display.user.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {display.headline ?? "-"}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
            fontSize: "0.8125rem",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {display.summary?.trim() ?? "No summary available."}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PlaceIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              {display.locationLabel ?? "World"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarOutlineOutlined
              sx={{ fontSize: 14, color: "text.secondary" }}
            />
            <Typography variant="caption" color="text.secondary">
              {Number(display.rating).toFixed(1)} ({display.reviewsCount})
            </Typography>
          </Box>
          {display.lastActiveLabel && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon
                sx={{ fontSize: 14, color: "text.secondary" }}
              />
              <Typography variant="caption" color="text.secondary">
                {display.lastActiveLabel}
              </Typography>
            </Box>
          )}
        </Box>

        {(display.languageLabel ??
          display.voiceAgeGenderLabel ??
          display.voiceTypeLabel) && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.75,
              mb: 1.5,
            }}
          >
            {display.languageLabel && (
              <Chip
                label={display.languageLabel}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: 1,
                  bgcolor: alpha(primary, 0.1),
                  color: primary,
                  border: "1px solid",
                  borderColor: alpha(primary, 0.25),
                }}
              />
            )}
            {display.voiceAgeGenderLabel && (
              <Chip
                label={display.voiceAgeGenderLabel}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: 1,
                  bgcolor: alpha(primary, 0.1),
                  color: primary,
                  border: "1px solid",
                  borderColor: alpha(primary, 0.25),
                }}
              />
            )}
            {display.voiceTypeLabel && (
              <Chip
                label={display.voiceTypeLabel}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  borderRadius: 1,
                  bgcolor: alpha(primary, 0.1),
                  color: primary,
                  border: "1px solid",
                  borderColor: alpha(primary, 0.25),
                }}
              />
            )}
          </Box>
        )}

        {provider.relevant_sample?.file && (
          <Box sx={{ mb: 1.5 }}>
            <AudioPlayer
              src={provider.relevant_sample.file}
              title={provider.relevant_sample.name}
              compact
            />
          </Box>
        )}

        <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            size="small"
            startIcon={
              display.allow_bookings ? <Bookmark sx={{ fontSize: 18 }} /> : null
            }
            disabled={!display.allow_bookings}
            sx={{
              borderRadius: 1.5,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.8125rem",
            }}
            component={Link}
            href={`https://voice123.com/${display.user.username}`}
            prefetch={true}
          >
            {display.allow_bookings ? "Book now" : "Unavailable"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
