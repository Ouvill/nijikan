import { Character } from "../store/settings/characters/type";
import { evalTS } from "../../../lib/utils/bolt";
import { fs } from "../../../lib/cep/node";
import { replaceExt } from "./replaceExt";
import { FeatureState } from "../store/settings/feature/state";

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
      const b = await fs.promises.readFile(subtitlePath);
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
      const b = await fs.promises.readFile(lipSyncPath);
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
  }).catch((e) => {
    alert(e.message);
  });
}
