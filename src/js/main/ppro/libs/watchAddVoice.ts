import { Character, Characters } from "../store/characters/type";
import Chokidar from "chokidar";
import { evalTS } from "../../../lib/utils/bolt";

async function insertCharacterTrackItems(
  voicePath: string,
  character: Character,
) {
  const isOk = await evalTS("checkBeforeInsert").catch(() => {
    return;
  });
  if (!isOk) return;

  evalTS(
    "insertCharacterTrackItems",
    voicePath,
    character.voiceTrackIndex,
  ).catch((e) => {
    alert(e.message);
  });
}

export function watchAddVoice(path: string, characters: Characters) {
  const chokidar: typeof Chokidar = require("chokidar");
  console.log("watch start");
  const watch = chokidar
    .watch(path, {
      ignoreInitial: true,
    })
    .on("add", (path) => {
      const soundExt = [".mp3", ".wav", ".ogg"];

      // 音声ファイルのみを対象にする
      if (!soundExt.includes(path.slice(-4))) return;

      // 音声ファイルのファイル名からキャラクター名を取得する
      Object.values(characters).forEach((character) => {
        if (path.includes(character.name)) {
          console.log("add chara voice", character.name, path);
          insertCharacterTrackItems(path, character);
        }
      });
    });

  return () => {
    watch.close().then(() => {
      console.log("watch close");
    });
  };
}
