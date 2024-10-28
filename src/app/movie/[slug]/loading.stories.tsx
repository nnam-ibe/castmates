import { Meta, StoryObj } from "@storybook/react";

import Loading from "./loading";

const meta: Meta<typeof Loading> = {
  component: Loading,
};
export default meta;

type Story = StoryObj<typeof Loading>;

export const Example: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: "/move/[id]",
        asPath: "/movie/1",
        query: {
          id: "1",
        },
      },
    },
  },
};
