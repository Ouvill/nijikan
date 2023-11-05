import { Character } from "./characters";

export type Store = {
  setting: {
    characters: {
      [name: string]: Character;
    };
  };
};

