import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <NuqsAdapter>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </NuqsAdapter>
    </AppRouterCacheProvider>
  );
};
