import { Character } from "../store/characters/type";
import { evalTS } from "../../../lib/utils/bolt";

export async function insertCharacterTrackItems(
  voicePath: string,
  character: Character,
) {
  const isOk = await evalTS("checkBeforeInsert").catch(() => {
    return;
  });
  if (!isOk) return;

  evalTS("insertCharacterTrackItems", voicePath, character.voiceTrackIndex, {
    insertOtherTrack: true,
  }).catch((e) => {
    alert(e.message);
  });
}
