import { defaultCharacter, charactersDefaultState } from "./state";
import { Character, CharacterActionType } from "./type";

export const actions = {
  addCharacter: (id: string) => ({
    type: CharacterActionType.ADD_CHARACTER,
    payload: { id },
  }),

  removeCharacter: (id: string) => ({
    type: CharacterActionType.REMOVE_CHARACTER,
    payload: { id },
  }),

  updateCharacter: ({
    character,
    characterId,
  }: {
    characterId: string;
    character: Character;
  }) => ({
    type: CharacterActionType.UPDATE_CHARACTER,
    payload: { characterId, character },
  }),
};

type Actions = ReturnType<(typeof actions)[keyof typeof actions]>;

export const characterReducer = (state = charactersDefaultState, action: Actions) => {
  switch (action.type) {
    case CharacterActionType.ADD_CHARACTER: {
      const { id } = action.payload;

      const regex = /^キャラクター_([0-9]+)$/;
      const numbers: number[] = [0];
      Object.values(state).forEach((character) => {
        const match = character.name.match(regex);
        if (match) {
          numbers.push(Number(match[1]));
        }
      });
      const maxNumber = Math.max(...numbers);

      return {
        ...state,
        [id]: {
          ...defaultCharacter,
          id: id,
          name: "キャラクター_" + (maxNumber + 1).toString().padStart(2, "0"),
        },
      };
    }

    case CharacterActionType.REMOVE_CHARACTER: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }

    case CharacterActionType.UPDATE_CHARACTER: {
      const { characterId, character } = action.payload;
      return {
        ...state,
        [characterId]: character,
      };
    }
    default: {
      return state;
    }
  }
};
