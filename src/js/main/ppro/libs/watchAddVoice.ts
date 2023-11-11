import { Character, Characters } from "../store/settings/characters/type";
import Chokidar from "chokidar";
import { fs } from "../../../lib/cep/node";

export function watchAddVoice(
  path: string,
  characters: Characters,
  callback: (path: string, character: Character) => void,
) {
  const chokidar: typeof Chokidar = require("chokidar");

  if (!fs.existsSync(path)) {
    alert("監視対象のフォルダが存在しません。");
  }
  console.log("watch start");
  const watch = chokidar
    .watch(path, {
      ignoreInitial: true,
    })
    .on("add", async (path) => {
      const soundExt = [".mp3", ".wav", ".ogg"];

      // 音声ファイルのみを対象にする
      if (!soundExt.includes(path.slice(-4))) return;

      // キャラクターの名前が含まれているか
      const targetChara = Object.values(characters).find((character) =>
        path.includes(character.name),
      );
      if (!targetChara) return;
      callback(path, targetChara);
    });

  return () => {
    watch.close().then(() => {
      console.log("watch close");
    });
  };
}
