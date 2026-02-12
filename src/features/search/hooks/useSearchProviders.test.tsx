import { renderHook, waitFor } from "@testing-library/react";
import { searchProviders } from "@/features/search/api/searchApi";
import type { NormalizedSearchResult } from "@/features/search/api/types";
import { createQueryWrapper } from "@/test-query-utils";
import {
  searchProvidersQueryKey,
  useSearchProviders,
} from "@/features/search/hooks/useSearchProviders";

jest.mock("@/features/search/api/searchApi", () => ({
  searchProviders: jest.fn(),
}));

const mockSearchProviders = searchProviders as jest.MockedFunction<
  typeof searchProviders
>;

const mockResult: NormalizedSearchResult = {
  providers: [
    {
      id: 1,
      user_id: 100,
      service_id: "voice_over",
      favorite: false,
      allow_bookings: false,
      stats: {},
      tts_enabled: false,
      tts_human_sample: { is_valid: false, display_transcript: false },
      user: {
        id: 100,
        public_hash: "abc",
        name: "Test User",
        last_interaction: "",
        roles: [],
        experiments: [],
        created_at: "",
      },
    },
  ],
  pagination: { page: 1, perPage: 10, total: 25, totalPages: 3 },
};

describe("searchProvidersQueryKey", () => {
  it("returns the correct query key with keywords, page, and options", () => {
    const key = searchProvidersQueryKey("narration", 1, {
      aggregations: true,
    });
    expect(key).toEqual([
      "search",
      "providers",
      "narration",
      1,
      { aggregations: true },
    ]);
  });

  it("trims the keywords in the query key", () => {
    const key = searchProvidersQueryKey("  commercial  ", 2);
    expect(key[2]).toBe("commercial");
  });
});

describe("useSearchProviders", () => {
  beforeEach(() => {
    mockSearchProviders.mockReset();
  });

  it("returns loading then success with the data", async () => {
    mockSearchProviders.mockResolvedValue(mockResult);
    const wrapper = createQueryWrapper();

    const { result } = renderHook(() => useSearchProviders("commercial", 1), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResult);
    expect(mockSearchProviders).toHaveBeenCalledTimes(1);
    expect(mockSearchProviders).toHaveBeenCalledWith("commercial", 1, {});
  });

  it("calls searchProviders with the aggregations option", async () => {
    mockSearchProviders.mockResolvedValue(mockResult);
    const wrapper = createQueryWrapper();

    const { result } = renderHook(
      () => useSearchProviders("voice", 2, { aggregations: true }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSearchProviders).toHaveBeenCalledWith("voice", 2, {
      aggregations: true,
    });
  });

  it("does not run the query when keywords are empty and enabled is true", async () => {
    const wrapper = createQueryWrapper();

    renderHook(() => useSearchProviders("", 1), { wrapper });

    await waitFor(() => {}, { timeout: 100 }).catch(() => {});

    expect(mockSearchProviders).not.toHaveBeenCalled();
  });

  it("does not run the query when keywords are only whitespace", async () => {
    const wrapper = createQueryWrapper();

    renderHook(() => useSearchProviders("   ", 1), { wrapper });

    await waitFor(() => {}, { timeout: 100 }).catch(() => {});

    expect(mockSearchProviders).not.toHaveBeenCalled();
  });

  it("does not run the query when enabled is false", async () => {
    mockSearchProviders.mockResolvedValue(mockResult);
    const wrapper = createQueryWrapper();

    renderHook(() => useSearchProviders("commercial", 1, { enabled: false }), {
      wrapper,
    });

    await waitFor(() => {}, { timeout: 100 }).catch(() => {});

    expect(mockSearchProviders).not.toHaveBeenCalled();
  });

  it("returns an error when searchProviders throws", async () => {
    mockSearchProviders.mockRejectedValue(new Error("Network error"));
    const wrapper = createQueryWrapper();

    const { result } = renderHook(() => useSearchProviders("fail", 1), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error("Network error"));
  });
});
