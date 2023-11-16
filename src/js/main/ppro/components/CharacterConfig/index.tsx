import React from "react";
import { Character } from "../../store/settings/characters/type";
import { SubtitleCharacterConfig } from "./SubtitleCharacterConfig";
import { LipSyncCharacterConfig } from "./LipSyncCharacterConfig";
import { ImageCharacterConfig } from "./ImageCharacterConfig";

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
        <div className={"flex flex-col gap-4"}>
          <div className={"flex flex-col gap-2"}>
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
          </div>

          <SubtitleCharacterConfig
            character={props.character}
            setCharacter={props.setCharacter}
          />
          <ImageCharacterConfig
            character={props.character}
            setCharacter={props.setCharacter}
          ></ImageCharacterConfig>
          <LipSyncCharacterConfig
            character={props.character}
            setCharacter={props.setCharacter}
          />
        </div>
      </div>
    </div>
  );
}
