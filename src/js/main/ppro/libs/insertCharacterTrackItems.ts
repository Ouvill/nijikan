import { Character } from "../store/characters/type";
import { evalTS } from "../../../lib/utils/bolt";
import { fs } from "../../../lib/cep/node";
import { replaceExt } from "./replaceExt";

export async function insertCharacterTrackItems(
  voicePath: string,
  character: Character,
) {
  const isOk = await evalTS("checkBeforeInsert").catch(() => {
    return;
  });
  if (!isOk) return;

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
    insertOtherTrack: true,
  }).catch((e) => {
    alert(e.message);
  });
}
