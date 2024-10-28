import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line
    return <img {...props} role="img" />;
  },
}));

afterEach(() => {
  cleanup();
});
