import movie507903 from "@/test/mocks/movie-507903";
import tv1418 from "@/test/mocks/tv-1418";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MediaDetails } from ".";

describe("MediaDetails", () => {
  const imgBasePath = "https://image.tmdb.org/t/p/w500";

  test("renders movie details", () => {
    render(<MediaDetails media={movie507903} />);
    expect(screen.getByText(movie507903.title)).toBeDefined();
    expect(screen.getByText("Genres")).toBeDefined();
    expect(screen.getByText("Romance")).toBeDefined();
    expect(screen.getByText("Comedy")).toBeDefined();
    expect(screen.getByText("Drama")).toBeDefined();
    expect(screen.getByText("Overview")).toBeDefined();
    expect(screen.getByText(/embarks on a rollercoaster/)).toBeDefined();
    expect(screen.getByText("Jim Parsons")).toBeDefined();
    expect(screen.getByText("as Michael Ausiello")).toBeDefined();
  });

  test("movie matches snapshot", () => {
    const { container } = render(<MediaDetails media={movie507903} />);
    expect(container).toMatchSnapshot();
  });

  test("renders tv details", () => {
    render(<MediaDetails media={tv1418} />);
    expect(screen.getByText(tv1418.name)).toBeDefined();
    expect(screen.getByText("Genres")).toBeDefined();
    expect(screen.getByText("Comedy")).toBeDefined();
    expect(screen.getByText("Overview")).toBeDefined();
    expect(screen.getByText(/Physicists Leonard and Sheldon/)).toBeDefined();
    expect(screen.getByText("Johnny Galecki")).toBeDefined();
    expect(screen.getByText("as Leonard Hofstadter")).toBeDefined();
    expect(screen.getByText("Jim Parsons")).toBeDefined();
    expect(screen.getByText("as Sheldon Cooper")).toBeDefined();
  });

  test("tv matches snapshot", () => {
    const { container } = render(<MediaDetails media={tv1418} />);
    expect(container).toMatchSnapshot();
  });
});
