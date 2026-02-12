import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const FILTER_KEYS = [
  "languages",
  "voice_age_genders",
  "voice_types",
  "tones",
] as const;

export type FilterKey = (typeof FILTER_KEYS)[number];

export const DEFAULT_PAGE = 1;

export interface FiltersState {
  keywords: string;
  languages: string;
  voice_age_genders: string;
  voice_types: string;
  tones: string;
  page: number;
}

const initialFiltersState: FiltersState = {
  keywords: "",
  languages: "",
  voice_age_genders: "",
  voice_types: "",
  tones: "",
  page: DEFAULT_PAGE,
};

const commaStringToIds = (value: string): number[] => {
  if (!value.trim()) return [];
  return value
    .split(",")
    .map((s) => Number.parseInt(s.trim(), 10))
    .filter((n) => !Number.isNaN(n));
};

const idsToCommaString = (ids: number[]): string => {
  return ids.join(",");
};

type FiltersActions = {
  setKeywords: (keywords: string) => void;
  setLanguages: (languages: string) => void;
  setVoiceAgeGenders: (voice_age_genders: string) => void;
  setVoiceTypes: (voice_types: string) => void;
  setTones: (tones: string) => void;
  setPage: (page: number) => void;
  setFilterIds: (key: FilterKey, ids: number[]) => void;
  getFilterIds: (key: FilterKey) => number[];
  resetFilters: () => void;
};

export const useFiltersStore = create<FiltersState & FiltersActions>()(
  devtools(
    (set, get) => ({
      ...initialFiltersState,

      setKeywords: (keywords) =>
        set({ keywords, page: DEFAULT_PAGE }),

      setLanguages: (languages) =>
        set({ languages, page: DEFAULT_PAGE }),

      setVoiceAgeGenders: (voice_age_genders) =>
        set({ voice_age_genders, page: DEFAULT_PAGE }),

      setVoiceTypes: (voice_types) =>
        set({ voice_types, page: DEFAULT_PAGE }),

      setTones: (tones) => set({ tones, page: DEFAULT_PAGE }),

      setPage: (page) => set({ page: Math.max(1, page) }),

      setFilterIds: (key, ids) =>
        set({ [key]: idsToCommaString(ids), page: DEFAULT_PAGE }),

      getFilterIds: (key) => {
        return commaStringToIds(get()[key]);
      },

      resetFilters: () => set(initialFiltersState),
    }),
    {
      name: "FiltersStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);

export type FiltersStateFilterKeys = Pick<
  FiltersState,
  "languages" | "voice_age_genders" | "voice_types" | "tones"
>;

export const getActiveFiltersCount = (
  state: FiltersState | FiltersStateFilterKeys,
): number => {
  let count = 0;
  for (const key of FILTER_KEYS) {
    count += commaStringToIds(state[key]).length;
  }
  return count;
};
