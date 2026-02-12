import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const defaultEmpty = "";
const defaultPage = 1;

export const filtersSearchParamsSchema = {
  keywords: parseAsString.withDefault(defaultEmpty),
  languages: parseAsString.withDefault(defaultEmpty),
  voice_age_genders: parseAsString.withDefault(defaultEmpty),
  voice_types: parseAsString.withDefault(defaultEmpty),
  tones: parseAsString.withDefault(defaultEmpty),
  page: parseAsInteger.withDefault(defaultPage),
} as const;

export const useFiltersSearchParams = () => {
  return useQueryStates(filtersSearchParamsSchema, { history: "push" });
};
