import { useQuery } from "@tanstack/react-query";
import { getAttributes } from "@/features/attributes/api/attributesApi";
import type { AttributesResponse } from "@/features/attributes/api/types";

export const attributesQueryKey = ["attributes"] as const;

export const useAttributes = (options?: { enabled?: boolean }) => {
  return useQuery<AttributesResponse>({
    queryKey: attributesQueryKey,
    queryFn: getAttributes,
    enabled: options?.enabled ?? true,
  });
};
