"use client";

import { Box, Typography } from "@mui/material";
import { useSearchStore } from "@/features/search/store/search-store";
import { ProviderCard } from "@/features/search/components/provider-card";

export const ProviderCardGrid = () => {
  const searchResult = useSearchStore((s) => s.searchResult);
  const providers = searchResult?.providers ?? [];

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
