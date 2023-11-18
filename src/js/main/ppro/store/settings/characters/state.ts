import { Character, Characters } from "./type";

export const defaultCharacter: Omit<Character, "id"> = {
  name: "キャラクター",
  regex: false,
  regexStr: "",
  voiceTrackIndex: 0,
  subtitleMogrtPath: "",
  subtitleTrackIndex: 0,
  subtitleParamName: "ソーステキスト",
  imagePosition: {
    x: 960,
    y: 540,
  },
  imageScale: 100,
  imagePath: "",
  imageHorizontalFlip: false,
  imageVidTrackIndex: 0,
  lipSyncMogrtPath: "",
  lipSyncVidTrackIndex: 0,
};

export const charactersDefaultState: Characters = {
  shikokuMetan: {
    id: "shikokuMetan",
    name: "四国めたん",
    regex: false,
    regexStr: "",
    subtitleMogrtPath: "",
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",
    imagePosition: {
      x: 960,
      y: 540,
    },
    imageScale: 100,
    imagePath: "",
    imageHorizontalFlip: false,
    imageVidTrackIndex: 0,
    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
  zundamon: {
    id: "zundamon",
    name: "ずんだもん",
    regex: false,
    regexStr: "",
    subtitleMogrtPath: "",
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",
    imagePosition: {
      x: 960,
      y: 540,
    },
    imageScale: 100,
    imagePath: "",
    imageHorizontalFlip: false,
    imageVidTrackIndex: 0,
    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
};
