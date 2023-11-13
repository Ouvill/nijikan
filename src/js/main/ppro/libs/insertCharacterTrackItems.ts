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

  evalTS("insertCharacterTrackItems", {
    voicePath,
    character,
    subtitle,
    overwriteTrack: features.overwriteTrack,
  }).catch((e) => {
    alert(e.message);
  });
}
