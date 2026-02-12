import { VOICE123_ATTRIBUTES_URL } from "@/features/search/api/constants";
import type { AttributesResponse } from "@/features/attributes/api/types";

export const getAttributes = async (): Promise<AttributesResponse> => {
  const attributesResponse = await fetch(VOICE123_ATTRIBUTES_URL);

  if (!attributesResponse.ok) {
    throw new Error(
      `Voice123 attributes failed: ${attributesResponse.status} ${attributesResponse.statusText}`,
    );
  }
  return attributesResponse.json();
};
