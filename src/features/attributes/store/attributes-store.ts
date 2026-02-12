import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";

type AttributesState = {
  attributes: AttributesSlimResponse;
  setAttributes: (attributes: AttributesSlimResponse) => void;
};

export const useAttributesStore = create<AttributesState>()(
  devtools(
    (set) => ({
      attributes: [],
      setAttributes: (attributes) => set({ attributes }),
    }),
    {
      name: "AttributesStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
