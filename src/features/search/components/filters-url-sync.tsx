"use client";

import { useEffect, useRef } from "react";
import { useFiltersSearchParams } from "@/features/search/lib/filters-search-params";
import { useFiltersStore } from "@/features/search/store/filters-store";
import { useShallow } from "zustand/react/shallow";

const filterKeys = [
  "keywords",
  "languages",
  "voice_age_genders",
  "voice_types",
  "tones",
] as const;

const filtersEqual = (
  a: Record<(typeof filterKeys)[number], string | undefined>,
  b: Record<(typeof filterKeys)[number], string | undefined>,
): boolean => {
  return filterKeys.every((k) => (a[k] ?? "") === (b[k] ?? ""));
};

const normalize = (
  p: Record<(typeof filterKeys)[number], string | undefined>,
): Record<(typeof filterKeys)[number], string> => {
  return {
    keywords: p.keywords ?? "",
    languages: p.languages ?? "",
    voice_age_genders: p.voice_age_genders ?? "",
    voice_types: p.voice_types ?? "",
    tones: p.tones ?? "",
  };
};

const pageEqual = (a: number, b: number) => a === b;

export const FiltersUrlSync = () => {
  const [params, setParams] = useFiltersSearchParams();
  const storeState = useFiltersStore(
    useShallow((s) => ({
      keywords: s.keywords,
      languages: s.languages,
      voice_age_genders: s.voice_age_genders,
      voice_types: s.voice_types,
      tones: s.tones,
      page: s.page,
    })),
  );
  const setKeywords = useFiltersStore((s) => s.setKeywords);
  const setLanguages = useFiltersStore((s) => s.setLanguages);
  const setVoiceAgeGenders = useFiltersStore((s) => s.setVoiceAgeGenders);
  const setVoiceTypes = useFiltersStore((s) => s.setVoiceTypes);
  const setTones = useFiltersStore((s) => s.setTones);
  const setPage = useFiltersStore((s) => s.setPage);

  const isApplyingUrlRef = useRef(false);

  useEffect(() => {
    const normalized = normalize(params);
    const filtersMatch = filtersEqual(normalized, storeState);
    const pageMatch = pageEqual(params.page, storeState.page);
    if (filtersMatch && pageMatch) return;
    isApplyingUrlRef.current = true;
    setKeywords(normalized.keywords);
    setLanguages(normalized.languages);
    setVoiceAgeGenders(normalized.voice_age_genders);
    setVoiceTypes(normalized.voice_types);
    setTones(normalized.tones);
    if (!pageMatch) setPage(params.page);
    // Do not clear ref here; let the store→URL effect clear it so it skips one cycle
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally omit storeState
  }, [
    params.keywords,
    params.languages,
    params.voice_age_genders,
    params.voice_types,
    params.tones,
    params.page,
  ]);

  useEffect(() => {
    if (isApplyingUrlRef.current) {
      isApplyingUrlRef.current = false;
      return;
    }
    const filtersMatch = filtersEqual(storeState, params);
    const pageMatch = pageEqual(storeState.page, params.page);
    if (filtersMatch && pageMatch) return;
    setParams({
      keywords: storeState.keywords,
      languages: storeState.languages,
      voice_age_genders: storeState.voice_age_genders,
      voice_types: storeState.voice_types,
      tones: storeState.tones,
      page: storeState.page,
    });
    // setParams from nuqs may have a new reference each render; only run when store values change
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setParams intentionally omitted
  }, [
    storeState.keywords,
    storeState.languages,
    storeState.voice_age_genders,
    storeState.voice_types,
    storeState.tones,
    storeState.page,
  ]);

  return null;
};
