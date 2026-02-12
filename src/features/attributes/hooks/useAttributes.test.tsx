import { renderHook, waitFor } from "@testing-library/react";
import { getAttributes } from "@/features/attributes/api/attributesApi";
import type { AttributesSlimResponse } from "@/features/attributes/api/types";
import { createQueryWrapper } from "@/test-query-utils";
import {
  attributesQueryKey,
  useAttributes,
} from "@/features/attributes/hooks/useAttributes";

jest.mock("@/features/attributes/api/attributesApi", () => ({
  getAttributes: jest.fn(),
}));

const mockGetAttributes = getAttributes as jest.MockedFunction<
  typeof getAttributes
>;

const mockAttributes: AttributesSlimResponse = [
  {
    id: 1,
    name: "languages",
    display_name: "languages",
    values: [{ id: 1018, name: "English - USA and Canada" }],
  },
];

describe("attributesQueryKey", () => {
  it("returns the correct query key", () => {
    expect(attributesQueryKey).toEqual(["attributes"]);
  });
});

describe("useAttributes", () => {
  beforeEach(() => {
    mockGetAttributes.mockReset();
  });

  it("returns loading then success with data", async () => {
    mockGetAttributes.mockResolvedValue(mockAttributes);
    const wrapper = createQueryWrapper();

    const { result } = renderHook(() => useAttributes(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAttributes);
    expect(mockGetAttributes).toHaveBeenCalledTimes(1);
  });

  it("does not run the query when enabled is false", async () => {
    const wrapper = createQueryWrapper();

    renderHook(() => useAttributes({ enabled: false }), { wrapper });

    await waitFor(() => {}, { timeout: 100 }).catch(() => {});

    expect(mockGetAttributes).not.toHaveBeenCalled();
  });

  it("runs the query when enabled is true", async () => {
    mockGetAttributes.mockResolvedValue(mockAttributes);
    const wrapper = createQueryWrapper();

    const { result } = renderHook(() => useAttributes({ enabled: true }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetAttributes).toHaveBeenCalled();
    expect(result.current.data).toEqual(mockAttributes);
  });

  it("returns an error when getAttributes throws", async () => {
    mockGetAttributes.mockRejectedValue(new Error("Fetch failed"));
    const wrapper = createQueryWrapper();

    const { result } = renderHook(() => useAttributes(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error("Fetch failed"));
  });
});
