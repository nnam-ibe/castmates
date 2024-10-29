import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { PersonBadgeUI } from "./person-badge-ui";
import { boolean } from "zod";

const meta = {
  component: PersonBadgeUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["success", "pending", "error"],
      control: "radio",
    },
  },
  args: {
    handleRemove: fn(),
    handleCheckedChange: fn(),
  },
} satisfies Meta<typeof PersonBadgeUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 13,
    name: "Alan Tyler",
    status: "success",
    checked: true,
  },
};
