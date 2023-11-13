import React from "react";
import { Character } from "../../store/settings/characters/type";
import { SubtitleCharacterConfig } from "./SubtitleCharacterConfig";
import { LipSyncCharacterConfig } from "./LipSyncCharacterConfig";

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
    </div>
  );
}
