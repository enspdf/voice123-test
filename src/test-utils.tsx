"use client";

import {
  render as rtlRender,
  type RenderOptions,
} from "@testing-library/react";
import { type ReactElement } from "react";
import { ThemeProvider } from "@/app/providers/theme-provider";

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return rtlRender(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

export * from "@testing-library/react";
export { customRender as render };
