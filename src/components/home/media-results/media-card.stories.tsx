import { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./media-card";

const meta = {
  component: MediaCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MediaCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    details: {
      id: 389173,
      title: "Love-In '72",
      year: "1970",
      posterPath: "/7rXrab9F62uOZ7812LHmAmgvsBi.jpg",
      mediaType: "movie",
      // genreIds: [18, 10759, 37, 99],
      genreIds: [18, 10759],
      characters: { "4492": "Father Reis" },
      overview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis condimentum euismod. Proin placerat pretium nunc, at congue arcu. Sed sit amet tincidunt ligula. Praesent vestibulum semper pharetra. Maecenas ultricies metus eget lorem scelerisque ultricies. Vestibulum quam odio, aliquet quis arcu vel, eleifend pharetra felis.",
    },
    people: [
      {
        adult: false,
        also_known_as: ["Phillip Hall", "Phil Hall", "Phillip Baker Hall"],
        biography:
          "Suspendisse ultrices, nisl eget fringilla tincidunt, nibh turpis placerat dui, at porta felis tellus nec lacus.",
        birthday: new Date("1931-09-10T00:00:00.000Z"),
        deathday: new Date("2022-06-12T00:00:00.000Z"),
        gender: 2,
        id: 4492,
        imdb_id: "nm0001311",
        known_for_department: "Acting",
        name: "Philip Baker Hall",
        place_of_birth: "Toledo, Ohio, USA",
        popularity: 10.501,
        profile_path: "/mC1wmuGSCyIQ7ABkfRe1jJV1FGV.jpg",
      },
    ],
    params: "p=4491&p=4492&f=4491",
  },
};
