import { VOICE123_ATTRIBUTES_URL } from "@/features/search/api/constants";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import { mapAttributesToSlim } from "@/features/attributes/api/attributesMapper";

export const getAttributes = async (): Promise<AttributesSlimResponse> => {
  const attributesResponse = await fetch(VOICE123_ATTRIBUTES_URL);

  if (!attributesResponse.ok) {
    throw new Error(
      `Voice123 attributes failed: ${attributesResponse.status} ${attributesResponse.statusText}`,
    );
  }

  const attributes = await attributesResponse.json();
  const mappedAttributes = mapAttributesToSlim(attributes);

  return mappedAttributes;
};
