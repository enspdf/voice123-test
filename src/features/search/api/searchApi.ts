import { VOICE123_SEARCH_URL } from "@/features/search/api/constants";
import type {
  NormalizedSearchResult,
  PaginationMeta,
  SearchProvidersResponseBody,
} from "@/features/search/api/types";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

const PAGINATION_HEADERS = {
  pageSize: "x-list-page-size",
  currentPage: "x-list-current-page",
  totalPages: "x-list-total-pages",
  totalRows: "x-list-total-rows",
} as const;

const getNumber = (headers: Headers, key: string): number | undefined => {
  const headerValue = headers.get(key);

  if (headerValue == null) {
    return undefined;
  }

  const numberValue = Number.parseInt(headerValue, 10);

  return Number.isNaN(numberValue) ? undefined : numberValue;
};

const parsePaginationFromHeaders = (
  headers: Headers,
): Partial<PaginationMeta> => {
  const page = getNumber(headers, PAGINATION_HEADERS.currentPage);
  const perPage = getNumber(headers, PAGINATION_HEADERS.pageSize);
  const total = getNumber(headers, PAGINATION_HEADERS.totalRows);
  const totalPages = getNumber(headers, PAGINATION_HEADERS.totalPages);

  return { page, perPage, total, totalPages };
};

const buildPaginationMeta = (
  fromBody: SearchProvidersResponseBody["pagination"],
  fromHeaders: Partial<PaginationMeta>,
  requestedPage: number,
): PaginationMeta => {
  const page =
    fromBody?.page ?? fromHeaders.page ?? requestedPage ?? DEFAULT_PAGE;
  const perPage = fromBody?.per_page ?? fromHeaders.perPage ?? DEFAULT_PER_PAGE;
  const total = fromBody?.total ?? fromHeaders.total ?? 0;
  const totalPages =
    fromBody?.total_pages ??
    fromHeaders.totalPages ??
    (perPage > 0 ? Math.ceil(total / perPage) : 0);
  return { page, perPage, total, totalPages };
};

export interface SearchProvidersFilters {
  languages?: string;
  voice_age_genders?: string;
  voice_types?: string;
  tones?: string;
}

export interface SearchProvidersOptions {
  aggregations?: boolean;
  filters?: SearchProvidersFilters;
}

const FILTER_PARAM_KEYS: (keyof SearchProvidersFilters)[] = [
  "languages",
  "voice_age_genders",
  "voice_types",
  "tones",
];

export const searchProviders = async (
  keywords: string,
  page: number,
  options?: SearchProvidersOptions,
): Promise<NormalizedSearchResult> => {
  const params = new URLSearchParams();

  if (keywords && keywords.trim().length > 0) {
    params.set("keywords", keywords.trim());
  }

  params.set("service", "voice_over");

  params.set("page", String(Math.max(1, page)));

  if (options?.aggregations) {
    params.set("aggregations", "true");
  }

  const filters = options?.filters;
  if (filters) {
    for (const key of FILTER_PARAM_KEYS) {
      const value = filters[key];
      if (value != null && String(value).trim().length > 0) {
        params.set(key, String(value).trim());
      }
    }
  }

  const url = `${VOICE123_SEARCH_URL}?${params.toString()}`;
  const providersResponse = await fetch(url);

  if (!providersResponse.ok) {
    throw new Error(
      `Voice123 search failed: ${providersResponse.status} ${providersResponse.statusText}`,
    );
  }

  const providersResponseBody: SearchProvidersResponseBody =
    await providersResponse.json();
  const headersPagination = parsePaginationFromHeaders(
    providersResponse.headers,
  );
  const pagination = buildPaginationMeta(
    providersResponseBody.pagination,
    headersPagination,
    page,
  );

  const result: NormalizedSearchResult = {
    providers: Array.isArray(providersResponseBody.providers)
      ? providersResponseBody.providers
      : [],
    pagination,
  };

  if (
    providersResponseBody.aggregations != null &&
    typeof providersResponseBody.aggregations === "object"
  ) {
    result.aggregations = providersResponseBody.aggregations;
  }

  return result;
};
