import type {
  AttributeDefinition,
  AttributeSlim,
  AttributesResponse,
  AttributesSlimResponse,
  AttributeValue,
  AttributeValueSlim,
} from "@/features/attributes/api/types";
import { ATTRIBUTE_NAMES_ALLOWED } from "@/features/attributes/api/types";

const ALLOWED_SET = new Set<string>(ATTRIBUTE_NAMES_ALLOWED);

const mapValue = (value: AttributeValue): AttributeValueSlim | null => {
  if (!value.enabled) return null;
  return { id: value.id, name: value.name };
};

const mapAttribute = (attr: AttributeDefinition): AttributeSlim | null => {
  if (!ATTRIBUTE_NAMES_ALLOWED.includes(attr.name)) return null;

  const values = attr.values
    .map(mapValue)
    .filter((value): value is AttributeValueSlim => value !== null);

  return {
    id: attr.id,
    name: attr.name,
    display_name: attr.display_name,
    values,
  };
};

export const mapAttributesToSlim = (
  attributes: AttributesResponse,
): AttributesSlimResponse => {
  const attributesSorted = attributes
    .map(mapAttribute)
    .filter((attribute): attribute is AttributeSlim => attribute !== null)
    .sort((attributeA, attributeB) => attributeA.id - attributeB.id);

  return attributesSorted;
};
