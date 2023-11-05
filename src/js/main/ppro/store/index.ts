export type Store = {
  setting: {
    characters: {
      [name: string]: Character;
    };
  };
};

export type Character = {
  name: string;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};
