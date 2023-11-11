import { Character, Characters } from "./type";

export const defaultCharacter: Omit<Character, "id"> = {
  name: "キャラクター",
  voiceTrackIndex: 0,
  subtitleMogrtPaths: [],
  subtitleTrackIndex: 0,
  subtitleParamName: "ソーステキスト",
  lipSyncMogrtPath: "",
  lipSyncVidTrackIndex: 0,
};

export const charactersDefaultState: Characters = {
  shikokuMetan: {
    id: "shikoku",
    name: "四国めたん",
    subtitleMogrtPaths: [],
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",

    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
  zundamon: {
    id: "zundamon",
    name: "ずんだもん",
    subtitleMogrtPaths: [],
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",

    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
  kasukabeTumugi: {
    id: "kasukabeTumugi",
    name: "春日部つむぎ",
    subtitleMogrtPaths: [],
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",

    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
  amehareHau: {
    id: "amehareHau",
    name: "雨晴はう",
    subtitleMogrtPaths: [],
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",
    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
  namineRitsu: {
    id: "namineRitsu",
    name: "波音リツ",
    subtitleMogrtPaths: [],
    subtitleTrackIndex: 0,
    subtitleParamName: "ソーステキスト",
    lipSyncMogrtPath: "",
    lipSyncVidTrackIndex: 0,
    voiceTrackIndex: 0,
  },
};
