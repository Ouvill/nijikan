import { Character } from "../store/settings/characters/type";
import { evalTS } from "../../../lib/utils/bolt";
import { fs } from "../../../lib/cep/node";
import { replaceExt } from "./replaceExt";
import { FeatureState } from "../store/settings/feature/state";
import { retry } from "./retry";

export async function insertCharacterTrackItems(
  voicePath: string,
  character: Character,
  features: FeatureState,
) {
  const isOk = await evalTS("checkBeforeInsert").catch(() => {
    return;
  });
  if (!isOk) return;

  let subtitle = "";
  if (
    features.insertSubtitle &&
    character.enableSubtitle &&
    character.subtitleMogrtPath !== ""
  ) {
    if (!fs.existsSync(character.subtitleMogrtPath)) {
      alert("字幕のモーショングラフィックステンプレートがありません");
      return;
    }
    try {
      const subtitlePath = replaceExt(voicePath, ".txt");
      const b = await retry(() => fs.promises.readFile(subtitlePath), 5, 100);
      subtitle = b.toString();
    } catch (e) {
      alert("字幕ファイルの読み取りに失敗しました");
      return;
    }
  }

  if (
    features.insertImage &&
    character.enableImage &&
    character.imagePath !== "" &&
    !fs.existsSync(character.imagePath)
  ) {
    alert("画像がありません");
    return;
  }

  let lab = "";
  if (
    features.insertLipSync &&
    character.enableLipSync &&
    character.lipSyncMogrtPath !== ""
  ) {
    if (!fs.existsSync(character.lipSyncMogrtPath)) {
      alert("口パクのモーショングラフィックステンプレートがありません");
      return;
    }

    try {
      const lipSyncPath = replaceExt(voicePath, ".lab");
      const b = await retry(() => fs.promises.readFile(lipSyncPath), 5, 100);
      lab = b.toString();
    } catch (e) {
      alert("labファイルの読み取りに失敗しました");
      return;
    }
  }

  evalTS("insertCharacterTrackItems", {
    voicePath,
    character,
    features,
    subtitle,
    lab,
  })
    .then((result) => {
      if (!result.isSuccess) {
        alert(result.error.message);
      }
    })
    .catch((e) => {
      alert(e.message);
    });
}
