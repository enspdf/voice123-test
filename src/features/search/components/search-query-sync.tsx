"use client";

import { useEffect, useRef } from "react";
import { useFiltersStore } from "@/features/search/store/filters-store";
import { useSearchStore } from "@/features/search/store/search-store";
import { useSearchProviders } from "@/features/search/hooks/useSearchProviders";

export const SearchQuerySync = () => {
  const keywords = useFiltersStore((s) => s.keywords);
  const page = useFiltersStore((s) => s.page);
  const languages = useFiltersStore((s) => s.languages);
  const voice_age_genders = useFiltersStore((s) => s.voice_age_genders);
  const voice_types = useFiltersStore((s) => s.voice_types);
  const tones = useFiltersStore((s) => s.tones);
  const setSearchResult = useSearchStore((s) => s.setSearchResult);
  const setSearchFetching = useSearchStore((s) => s.setSearchFetching);
  const isFirstRun = useRef(true);

  const { data, isFetching } = useSearchProviders(keywords, page, {
    aggregations: true,
    filters: {
      languages: languages || undefined,
      voice_age_genders: voice_age_genders || undefined,
      voice_types: voice_types || undefined,
      tones: tones || undefined,
    },
  });

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setSearchResult(null);
  }, [keywords, page, languages, voice_age_genders, voice_types, tones, setSearchResult]);

  useEffect(() => {
    setSearchFetching(isFetching);
  }, [isFetching, setSearchFetching]);

  useEffect(() => {
    if (!isFetching && data != null) {
      setSearchResult(data);
    }
  }, [data, isFetching, setSearchResult]);

  return null;
}
