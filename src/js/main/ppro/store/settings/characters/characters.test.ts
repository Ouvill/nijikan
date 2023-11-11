import { expect, test } from "vitest";
import { Character, Characters } from "./type";
import { charactersActions, charactersReducer } from "./index";
import { defaultCharacter } from "./state";
import { PayloadAction } from "@reduxjs/toolkit";

const { addCharacter, removeCharacter, updateCharacter } = charactersActions;

test("characterReducer adds a new character", () => {
  const prevState: Characters = {
    "5": {
      ...defaultCharacter,
      id: "5",
      name: "キャラクター_05",
    },
  };
  const action = {
    type: addCharacter.type,
    payload: { id: "6" },
  };
  const newState = charactersReducer(prevState, action);
  expect(newState).toEqual({
    "5": {
      ...defaultCharacter,
      id: "5",
      name: "キャラクター_05",
    },
    "6": {
      ...defaultCharacter,
      id: "6",
      name: "キャラクター_06",
    },
  });
});

test("characterReducer removes a character", () => {
  const prevState: Characters = {
    "1": {
      ...defaultCharacter,
      id: "1",
      name: "キャラクター_01",
    },
    "2": {
      ...defaultCharacter,
      id: "2",
      name: "キャラクター_02",
    },
  };
  const action = {
    type: removeCharacter.type,
    payload: { id: "1" },
  };
  const newState = charactersReducer(prevState, action);
  expect(newState).toEqual({
    "2": {
      ...defaultCharacter,
      id: "2",
      name: "キャラクター_02",
    },
  });
});

test("characterReducer updates a character", () => {
  const prevState: Characters = {
    "1": {
      ...defaultCharacter,
      id: "1",
      name: "キャラクター_01",
    },
  };
  const action: PayloadAction<{ characterId: string; character: Character }> = {
    type: updateCharacter.type,
    payload: {
      characterId: "1",
      character: {
        ...defaultCharacter,
        id: "1",
        name: "キャラクター_01_updated",
      },
    },
  };
  const newState = charactersReducer(prevState, action);
  expect(newState).toEqual({
    "1": {
      ...defaultCharacter,
      id: "1",
      name: "キャラクター_01_updated",
    },
  });
});

test("characterReducer returns default state for unknown action", () => {
  const prevState = {
    "1": {
      ...defaultCharacter,
      id: "1",
      name: "キャラクター_01",
    },
  };
  const action = {
    type: "UNKNOWN_ACTION",
    payload: {},
  };
  const newState = charactersReducer(prevState, action);
  expect(newState).toEqual(prevState);
});
