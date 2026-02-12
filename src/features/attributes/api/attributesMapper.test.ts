import type { AttributesResponse } from "@/features/attributes/api/types";
import { mapAttributesToSlim } from "@/features/attributes/api/attributesMapper";

const attributesResponse: AttributesResponse = [
  {
    id: 1,
    scope: ["voice_over"],
    roles: ["providers"],
    name: "languages",
    display_name: "Languages",
    highlight: { scope: [] },
    values: [
      { id: 10, name: "English", stripe_payouts_enabled: false, enabled: true },
      {
        id: 11,
        name: "Spanish",
        stripe_payouts_enabled: false,
        enabled: false,
      },
    ],
  },
  {
    id: 2,
    scope: [],
    roles: [],
    name: "genders",
    display_name: "Genders",
    highlight: { scope: [] },
    values: [
      { id: 20, name: "Male", stripe_payouts_enabled: false, enabled: true },
    ],
  },
  {
    id: 3,
    scope: [],
    roles: [],
    name: "internal_attr",
    display_name: "Internal",
    highlight: { scope: [] },
    values: [],
  },
];

describe("mapAttributesToSlim", () => {
  it("filters attributes by allowed names only", () => {
    const result = mapAttributesToSlim(attributesResponse);
    expect(result).toHaveLength(2);
    expect(result.map((a) => a.name)).toEqual(["languages", "genders"]);
  });

  it("keeps only id, name, display_name, values per attribute", () => {
    const result = mapAttributesToSlim(attributesResponse);
    const languages = result.find(
      (attribute) => attribute.name === "languages",
    );

    expect(languages).toEqual({
      id: 1,
      name: "languages",
      display_name: "Languages",
      values: [{ id: 10, name: "English" }],
    });
  });

  it("filters values to enabled only and keeps only id, name", () => {
    const result = mapAttributesToSlim(attributesResponse);
    const languages = result.find(
      (attribute) => attribute.name === "languages",
    );

    expect(languages?.values).toHaveLength(1);
    expect(languages?.values[0]).toEqual({ id: 10, name: "English" });
  });
});
