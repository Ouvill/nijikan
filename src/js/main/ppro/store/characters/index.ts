import { defaultState } from "./defaultState";
import { Character, CharacterActionType, Characters } from "./type";

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

const localStorageKey = "characters";

const saveCharactersToLocalStorage = (characters: Characters) => {
  localStorage.setItem(localStorageKey, JSON.stringify(characters));
};

const loadCharactersFromLocalStorage = (): Characters => {
  const characters = localStorage.getItem(localStorageKey);
  if (characters) {
    return JSON.parse(characters) as Characters;
  }
  return {};
};

export const characterReducer = (state = defaultState, action: Actions) => {
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

      const newState = {
        ...state,
        [id]: {
          id: id,
          name: "キャラクター_" + (maxNumber + 1).toString().padStart(2, "0"),
          lipSyncMogrtPath: "",
          lipSyncVidTrackIndex: 0,
          voiceTrackIndex: 0,
        },
      };

      saveCharactersToLocalStorage(newState);
      return newState;
    }

    case CharacterActionType.REMOVE_CHARACTER: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      saveCharactersToLocalStorage(newState);
      return newState;
    }

    case CharacterActionType.UPDATE_CHARACTER: {
      const { characterId, character } = action.payload;
      const newState = {
        ...state,
        [characterId]: character,
      };
      saveCharactersToLocalStorage(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
};

export const createInitialState = (initialState: Characters) => {
  return loadCharactersFromLocalStorage() || initialState;
};
