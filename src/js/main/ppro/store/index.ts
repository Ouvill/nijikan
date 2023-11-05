export type Store = {
  setting: {
    characters: {
      [name: string]: Character;
    };
  };
};

type Character = {
  name: string;
  kutipakuMogrtPath: string;
  kutipakuMogrtTrackIndex: number;
  voiceTrackIndex: number;
};
