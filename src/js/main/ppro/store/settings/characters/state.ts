import { Character, Characters } from "./type";

export const defaultCharacter: Omit<Character, "id"> = {
  name: "キャラクター",
  regex: false,
  regexStr: "",
  voiceTrackIndex: 0,
  enableSubtitle: false,
  subtitleMogrtPath: "",
  subtitleTrackIndex: 0,
  subtitleParamName: "ソーステキスト",
  enableImage: false,
  imagePosition: {
    x: 960,
    y: 540,
  },
  imageScale: 100,
  imagePath: "",
  imageHorizontalFlip: false,
  imageVidTrackIndex: 0,
  enableLipSync: false,
  lipSyncMogrtPath: "",
  lipSyncVidTrackIndex: 0,
};

export const charactersDefaultState: Characters = {};
