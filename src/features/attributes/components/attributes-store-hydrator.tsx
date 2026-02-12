"use client";

import { useEffect } from "react";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import { useAttributesStore } from "@/features/attributes/store/attributes-store";

type AttributesStoreHydratorProps = {
  attributes: AttributesSlimResponse;
  children: React.ReactNode;
};

export const AttributesStoreHydrator = ({
  attributes,
  children,
}: AttributesStoreHydratorProps) => {
  useEffect(() => {
    useAttributesStore.getState().setAttributes(attributes);
  }, [attributes]);

  return <>{children}</>;
};
