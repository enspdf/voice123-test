import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "@/features/attributes/api/attributesApi";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";

export const attributesQueryKey = ["attributes"] as const;

export const useAttributes = (options?: { enabled?: boolean }) => {
  return useQuery<AttributesSlimResponse>({
    queryKey: attributesQueryKey,
    queryFn: getAttributes,
    enabled: options?.enabled ?? true,
  });
};
