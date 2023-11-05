import { v4 as uuidv4 } from "uuid";

export type Characters = { [name: string]: Character };

export type Character = {
  id: string;
  name: string;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};

type Payload = {
  characterId: string;
  character?: Character;
};

const CharacterActionType = {
  ADD_CHARACTER: "ADD_CHARACTER",
  REMOVE_CHARACTER: "REMOVE_CHARACTER",
  UPDATE_CHARACTER: "UPDATE_CHARACTER",
} as const;

type CharacterAction =
  | {
      type: typeof CharacterActionType.ADD_CHARACTER;
    }
  | {
      type: typeof CharacterActionType.REMOVE_CHARACTER;
      payload: { id: number };
    }
  | {
      type: typeof CharacterActionType.UPDATE_CHARACTER;
      payload: Payload;
    };

export const characterReducer = (state = initialState, action: CharacterAction) => {
  switch (action.type) {
    case CharacterActionType.ADD_CHARACTER: {
      const id = uuidv4();
      return {
        ...state,
        [id]: {
          id: id,
          name: "キャラクター名",
          lipSyncMogrtPath: "",
          lipSyncVidTrackIndex: 0,
          voiceTrackIndex: 0,
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

const initialState: Characters = {};
