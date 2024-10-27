import { describe, test, expect, vi } from "vitest";
import * as client from "@/lib/client";
import searchResults from "@/test/mocks/search.json";
import person18918 from "@/test/mocks/person-18918.json";
import person543 from "@/test/mocks/person-543.json";
import combinedCredits543 from "@/test/mocks/combined-credits-543.json";
import combinedCredits20904 from "@/test/mocks/combined-credits-20904.json";
import {
  searchPeople,
  getPerson,
  getCombinedCredits,
  getSharedCredits,
} from ".";

const spy = vi.spyOn(client, "get");
spy.mockImplementation(async (url) => {
  if (url === "/search/person") {
    return searchResults;
  }
  if (url === "/person/18918") {
    return person18918;
  }
  if (url === "/person/543") {
    return person543;
  }

  if (url === "/person/543/combined_credits") {
    return combinedCredits543;
  }

  if (url === "/person/20904/combined_credits") {
    return combinedCredits20904;
  }
});

describe("People service", () => {
  describe("searchPeople", () => {
    test("min length", async () => {
      expect(searchPeople("")).rejects.toThrow(
        /Query must be at least 3 characters long/
      );
    });

    test("return parsed result", async () => {
      const result = await searchPeople("Ryan");
      expect(result.length).toBe(2);
      expect(result).toEqual([
        {
          adult: false,
          gender: 2,
          id: 1619557,
          known_for_department: "Acting",
          name: "Ryan",
          original_name: "Ryan",
          popularity: 2.009,
          profile_path: "/wlywpleg1obE0P8yXuROafGw2eI.jpg",
          known_for: [],
        },
        {
          adult: false,
          gender: 2,
          id: 10859,
          known_for_department: "Acting",
          name: "Ryan Reynolds",
          original_name: "Ryan Reynolds",
          popularity: 112.808,
          profile_path: "/algQ1VEno2W9SesoArWcZTeF617.jpg",
          known_for: [],
        },
      ]);
    });
  });

  describe("getPerson", () => {
    test("checks for number", async () => {
      expect(getPerson(NaN)).rejects.toThrow(/Invalid id/);
    });

    test("parses dates", async () => {
      const result = await getPerson(543);
      expect(result).toEqual({
        adult: false,
        also_known_as: [],
        biography: "",
        birthday: null,
        deathday: null,
        gender: 1,
        id: 543,
        imdb_id: "nm0611127",
        known_for_department: "Acting",
        name: "Marianne Muellerleile",
        place_of_birth: "St. Louis, Missouri, USA",
        popularity: 6.307,
        profile_path: "/8mlAV0ChK35WXQrnlKoEzKNNrFR.jpg",
      });
    });

    test("return person info", async () => {
      const result = await getPerson(18918);
      expect(result).toEqual({
        adult: false,
        also_known_as: [],
        biography: "A simplified biography",
        birthday: new Date("1972-05-02T00:00:00.000Z"),
        deathday: null,
        gender: 2,
        homepage: "https://wwe.com/superstars/the-rock",
        id: 18918,
        imdb_id: "nm0425005",
        known_for_department: "Acting",
        name: "Dwayne Johnson",
        place_of_birth: "Hayward, California, USA",
        popularity: 85.214,
        profile_path: "/5QApZVV8FUFlVxQpIK3Ew6cqotq.jpg",
      });
    });
  });

  describe("getCombinedCredits", () => {
    test("checks for number", async () => {
      expect(getCombinedCredits(NaN)).rejects.toThrow(/Invalid id/);
    });

    test("return combined credits", async () => {
      const result = await getCombinedCredits(543);
      expect(result.id).toEqual(543);
      expect(result.cast).toEqual([
        {
          adult: false,
          backdrop_path: "/dKRwGY5MhTMV1jJaAlDY0ehnJBt.jpg",
          genre_ids: [28, 12, 878, 53],
          id: 55326,
          original_title: "Adventures of Johnny Tao",
          overview:
            "Johnny Dow struggles to make a living at his small town gas station by charging motorists to see the electric guitar used by his late father a one-hit, rock and roll wonder. Legend has it the guitar was carved in the shape of a dragon's head and made in part from an ancient spear his father found in the crater of a shooting star. When Johnny's friend Eddie stumbles upon the other half of the spear he releases an ancient demon hungry for power and destruction. Mika a beautiful Chinese warrior who holds the secret to fighting Eddie and his army of kung fu, sugar-craving warriors reveals to Johnny that the only way to stop the evil spirit is to use the first half of the spear - the dragon on Johnny's guitar! Together Johnny and Mika set out to fight Eddie and his army, reunite the two halves of the spear, restore peace to the town and - of course - save the world!",
          popularity: 1.705,
          poster_path: "/lOeJ0n6ezLsh3ezxlYpPQxHQByP.jpg",
          release_date: new Date("2008-07-29T00:00:00.000Z"),
          title: "Adventures of Johnny Tao",
          video: false,
          character: "Kate",
          credit_id: "52fe48c7c3a36847f8178de1",
          order: 8,
          media_type: "movie",
        },
        {
          adult: false,
          genre_ids: [18],
          id: 74034,
          original_title: "Welcome to Paradise",
          overview:
            "When big-city preacher Debbie Laramie (Crystal Bernard) moves to the small town of Paradise with her son Hayden (Bobby Edner), she finds the local community unreceptive to her message of love and forgiveness. Determined to get through to her stubborn congregation, Debbie uses unique methods to shake the churchgoers out of their indifference, such as inviting a homeless man to sing during one of the services. Brian Dennehy co-stars.",
          popularity: 3.326,
          poster_path: "/azvbRarIrJWXVctKp7PMI4i17Rz.jpg",
          release_date: new Date("2007-10-01T00:00:00.000Z"),
          title: "Welcome to Paradise",
          character: "Doris Fargo",
          credit_id: "52fe48b9c3a368484e107763",
          order: 15,
          media_type: "movie",
        },
        {
          adult: false,
          backdrop_path: "/84J4XwvJ0tb7pmgqLQ87TgQHnyN.jpg",
          genre_ids: [35],
          id: 14052,
          original_title: "Revenge of the Nerds",
          overview:
            "At Adams College, the jocks rule the school from their house on high, the Alpha Beta fraternity. So when a group of socially-challenged misfits try to go Greek, they're instantly rejected by every house on campus. Deciding to start their own fraternity to protect their outcast brothers, the campus nerds soon find themselves in a battle royale as the Alpha Betas try to crush their new rivals.",
          popularity: 20.606,
          poster_path: "/v8aETLufi4WIinhQ994oWkehtaC.jpg",
          release_date: new Date("1984-07-20T00:00:00.000Z"),
          title: "Revenge of the Nerds",
          video: false,
          character: "Woman",
          credit_id: "65b4822f1c635b017b12b4ba",
          order: 21,
          media_type: "movie",
        },
        {
          adult: false,
          character: "Doris Fargo",
          credit_id: "52fe48b9c3a368484e107763",
          genre_ids: [18],
          id: 9289382,
          media_type: "movie",
          order: 15,
          original_title: "Unreleased movie",
          overview: "Sample Plot overview",
          popularity: 0,
          title: "Community unrelased movie",
        },
      ]);
    });
  });

  describe("getSharedCredits", () => {
    test("returns shared credits", async () => {
      const result = await getSharedCredits([543, 20904]);
      expect(result).toEqual([
        {
          id: 55326,
          title: "Adventures of Johnny Tao",
          year: "2008",
          posterPath: "/lOeJ0n6ezLsh3ezxlYpPQxHQByP.jpg",
          mediaType: "movie",
          genreIds: [28, 12, 878, 53],
          characters: {
            "543": "Kate",
            "20904": "Sifu",
          },
        },
      ]);
    });
  });
});
