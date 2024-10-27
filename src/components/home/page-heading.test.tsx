import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeading } from "./page-heading";

describe("PageHeading", () => {
  beforeEach(() => {
    render(<PageHeading />);
  });

  test("renders the main heading with correct text and styling", () => {
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /actor collaboration explorer/i,
    });

    expect(heading.className).toContain("text-3xl");
    expect(heading.className).toContain("font-bold");
  });

  test("renders the subtitle with correct text and styling", () => {
    const subtitle = screen.getByText(
      /compare filmographies and discover shared movies/i
    );

    expect(subtitle.className).toContain("text-neutral-600");
  });

  test("container has correct layout classes", () => {
    const container = screen.getByRole("heading", {
      level: 1,
      name: /actor collaboration explorer/i,
    }).parentElement;

    expect(container?.className).toContain("text-center");
    expect(container?.className).toContain("space-y-2");
  });

  test("matches snapshot", () => {
    const { container } = render(<PageHeading />);
    expect(container).toMatchSnapshot();
  });
});
