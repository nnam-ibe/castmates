import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CastCard } from "./cast-card";

describe("CastCard", () => {
  const mockCast = {
    id: 1,
    name: "Brad Pitt",
    character: "Tyler Durden",
    profile_path: "/profile123.jpg",
  };

  const imgBasePath = "https://image.tmdb.org/t/p/w500";

  test("renders the cast member name", () => {
    render(<CastCard cast={mockCast} />);
    expect(screen.getByText("Brad Pitt")).toBeDefined();
  });

  test("renders the character name", () => {
    render(<CastCard cast={mockCast} />);
    expect(screen.getByText("as Tyler Durden")).toBeDefined();
  });

  test("renders image", () => {
    render(<CastCard cast={mockCast} />);
    const image = screen.getByRole("img");
    expect(image.getAttribute("src")).toBe(`${imgBasePath}/profile123.jpg`);
    expect(image.getAttribute("width")).toBe("128");
    expect(image.getAttribute("height")).toBe("128");
  });
});
