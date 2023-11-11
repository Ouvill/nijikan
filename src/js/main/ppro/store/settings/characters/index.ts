import { charactersDefaultState, defaultCharacter } from "./state";
import { Character, Characters } from "./type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function addSuffixNum(name: string, state: Characters) {
  const regex = new RegExp(`${name}_(\\d+)`);
  const numbers: number[] = [0];
  Object.values(state).forEach((character) => {
    const match = character.name.match(regex);
    if (match) {
      numbers.push(Number(match[1]));
    }
  });
  return Math.max(...numbers);
}

const characters = createSlice({
  name: "setting/characters",
  initialState: charactersDefaultState,
  reducers: {
    addCharacter: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const maxNumber = addSuffixNum("キャラクター", state);
      return {
        ...state,
        [id]: {
          ...defaultCharacter,
          id: id,
          name: "キャラクター_" + (maxNumber + 1).toString().padStart(2, "0"),
        },
      };
    },
    removeCharacter: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    },
    updateCharacter: (
      state,
      action: PayloadAction<{ characterId: string; character: Character }>,
    ) => {
      const { characterId, character } = action.payload;
      return {
        ...state,
        [characterId]: character,
      };
    },
  },
});

export const charactersActions = characters.actions;

export const charactersReducer = characters.reducer;
