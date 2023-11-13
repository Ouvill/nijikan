import { evalTS } from "../../../../lib/utils/bolt";
import path from "path";
import React from "react";
import Button from "../../../../components/Button";
import { getPublicPath } from "../../libs/getPublicPath";

import { Character } from "../../store/settings/characters/type";
import { SubtitleCharacterConfig } from "./SubtitleCharacterConfig";
import { LipSyncCharacterConfig } from "./LipSyncCharacterConfig";

const state_controller_mogrt = "nijikan_state_controller.mogrt";

export function CharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const changeVoiceTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      voiceTrackIndex: value - 1,
    });
  };

  const importStateControllerMogrt = () => {
    const mogrtPath = path.join(getPublicPath(), state_controller_mogrt);
    evalTS("importMogrt", mogrtPath).catch((e) => {
      alert(e.message);
    });
  };

  const moveClip = () => {
    evalTS("moveClip", 10).catch((e) => {
      alert(e.message);
    });
  };

  const alertClips = () => {
    evalTS("alertTracks").catch((e) => {
      alert(e.message);
    });
  };

  const changeCharacterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setCharacter({
      ...props.character,
      name: e.target.value,
    });
  };

  return (
    <div>
      <div className={"not-prose"}>
        <p>キャラクター設定</p>
        <div className={"flex justify-between"}>
          <p>名前</p>
          <input
            className={"text-black"}
            value={props.character.name}
            onChange={changeCharacterName}
          />
        </div>
        <div className={"flex justify-between"}>
          <p>音声トラック番号</p>
          <input
            className={"text-black"}
            type={"number"}
            value={props.character.voiceTrackIndex + 1}
            min={1}
            onChange={changeVoiceTrackIndex}
          />
        </div>

        <SubtitleCharacterConfig
          character={props.character}
          setCharacter={props.setCharacter}
        />
        <LipSyncCharacterConfig
          character={props.character}
          setCharacter={props.setCharacter}
        />
      </div>

      <div>
        <p>表情制御</p>
      </div>
      <div className={"flex flex-col"}>
        <Button onClick={importStateControllerMogrt}>表情クリップ挿入</Button>
        <Button onClick={moveClip}>moveClip</Button>
        <Button onClick={alertClips}>alertClips</Button>
        <Button>表情クリップを変更/反映</Button>
      </div>
      <div>
        <p>データ送信</p>
        <Button>表情データを反映</Button>
      </div>
    </div>
  );
}
