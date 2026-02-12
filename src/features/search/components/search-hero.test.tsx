"use client";

import { render, screen } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import { SearchHero } from "@/features/search/components/search-hero";
import { POPULAR_SEARCHES } from "@/features/search/constants";

jest.mock("@/components/audio-waves-canvas", () => ({
  AudioWavesCanvas: () => <div data-testid="audio-waves-canvas" />,
}));

describe("SearchHero", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the SearchHero component", () => {
    render(<SearchHero />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders the header with Voice123 branding and Trending", () => {
    render(<SearchHero />);
    expect(screen.getByText("Voice123")).toBeInTheDocument();
    expect(screen.getByText("Trending")).toBeInTheDocument();
  });

  it("renders the hero title", () => {
    render(<SearchHero />);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Discover amazing voices",
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the search bar with correct placeholder", () => {
    render(<SearchHero />);
    const input = screen.getByPlaceholderText(
      "Search for voice style, language, or keyword...",
    );
    expect(input).toBeInTheDocument();
  });

  it("renders a submit Search button", () => {
    render(<SearchHero />);
    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeInTheDocument();
  });

  it("renders Popular searches label and all popular search chips", () => {
    render(<SearchHero />);
    expect(screen.getByText("Popular searches")).toBeInTheDocument();
    for (const label of POPULAR_SEARCHES) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });

  it("updates search input when user types", async () => {
    const user = userEvent.setup();
    render(<SearchHero />);
    const input = screen.getByPlaceholderText(
      "Search for voice style, language, or keyword...",
    );
    await user.type(input, "English");
    expect(input).toHaveValue("English");
  });

  it("sets search input to chip label when a popular search chip is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchHero />);
    const input = screen.getByPlaceholderText(
      "Search for voice style, language, or keyword...",
    );
    expect(input).toHaveValue("");
    await user.click(screen.getByRole("button", { name: "Podcast" }));
    expect(input).toHaveValue("Podcast");
  });

  it("renders theme mode toggle in header", () => {
    render(<SearchHero />);
    const toggle = screen.getByRole("button", {
      name: /switch to (dark|light) mode/i,
    });
    expect(toggle).toBeInTheDocument();
  });
});
