"use client";

import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useSearchStore } from "@/features/search/store/search-store";
import { ProviderCard } from "@/features/search/components/provider-card";

const SKELETON_CARD_COUNT = 4;

const ProviderCardSkeleton = () => {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Skeleton
            variant="rounded"
            width={48}
            height={48}
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Skeleton variant="text" width="70%" height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="50%" height={20} />
          </Box>
        </Box>
        <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={16} sx={{ mb: 1.5 }} />
        <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
          <Skeleton variant="text" width={64} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </Box>
        <Box sx={{ display: "flex", gap: 0.75, mb: 1.5 }}>
          <Skeleton variant="rounded" width={56} height={24} />
          <Skeleton variant="rounded" width={72} height={24} />
          <Skeleton variant="rounded" width={48} height={24} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={100} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
};

export const ProviderCardGrid = () => {
  const searchResult = useSearchStore((s) => s.searchResult);
  const providers = searchResult?.providers ?? [];
  const isLoading = searchResult === null;

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", px: { xs: 2, sm: 3 }, py: 3 }}>
        <Skeleton variant="text" width={220} height={28} sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, i) => (
            <ProviderCardSkeleton key={i} />
          ))}
        </Box>
      </Box>
    );
  }

  if (providers.length === 0) {
    return (
      <Box
        sx={{ width: "100%", px: { xs: 2, sm: 3 }, py: 3, textAlign: "center" }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          No voice actors found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please try again with different search criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 3 }, py: 3 }}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        ({searchResult?.pagination?.total ?? providers.length}) voice actors
        found
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </Box>
    </Box>
  );
};
