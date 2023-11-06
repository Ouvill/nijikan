import { Character } from "./characters/type";

export type Store = {
  setting: {
    characters: {
      [name: string]: Character;
    };
  };
};
