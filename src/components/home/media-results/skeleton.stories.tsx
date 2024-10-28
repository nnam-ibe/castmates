import { Meta, StoryObj } from "@storybook/react";

import { MediaCardSkeleton } from "./skeleton";

const meta: Meta<typeof MediaCardSkeleton> = {
  component: MediaCardSkeleton,
};
export default meta;

type Story = StoryObj<typeof MediaCardSkeleton>;

export const Example: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/profile/[id]",
        asPath: "/profile/1",
        query: {
          id: "1",
        },
      },
    },
  },
};
