import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Providers } from "./Providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "App",
  description: "Next.js + MUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <NuqsAdapter>
            <Providers>{children}</Providers>
          </NuqsAdapter>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
