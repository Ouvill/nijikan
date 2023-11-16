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

  if (!fs.existsSync(character.subtitleMogrtPath)) {
    alert("字幕のモーショングラフィックステンプレートがありません");
    return;
  }

  let subtitle;
  try {
    const subtitlePath = replaceExt(voicePath, ".txt");
    const b = await fs.promises.readFile(subtitlePath);
    subtitle = b.toString();
  } catch (e) {
    alert("字幕ファイルの読み取りに失敗しました");
    return;
  }

  if (
    features.insertImage &&
    character.imagePath !== "" &&
    !fs.existsSync(character.imagePath)
  ) {
    alert("画像がありません");
    return;
  }

  if (
    features.insertLipSync &&
    character.lipSyncMogrtPath !== "" &&
    !fs.existsSync(character.lipSyncMogrtPath)
  ) {
    alert("口パクのモーショングラフィックステンプレートがありません");
    return;
  }
  let lab = "";
  try {
    if (features.insertLipSync) {
      const lipSyncPath = replaceExt(voicePath, ".lab");
      const b = await fs.promises.readFile(lipSyncPath);
      lab = b.toString();
    }
  } catch (e) {
    alert("labファイルの読み取りに失敗しました");
    return;
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
