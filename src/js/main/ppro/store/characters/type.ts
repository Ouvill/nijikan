export type Character = {
  id: string;
  name: string;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};

export const CharacterActionType = {
  ADD_CHARACTER: "ADD_CHARACTER",
  REMOVE_CHARACTER: "REMOVE_CHARACTER",
  UPDATE_CHARACTER: "UPDATE_CHARACTER",
} as const;

export type Characters = { [name: string]: Character };
