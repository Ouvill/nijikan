import { Character } from "../../store/settings/characters/type";
import { evalTS } from "../../../../lib/utils/bolt";
import React, { useState } from "react";
import Button from "../../../../components/Button";

export function SubtitleCharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const [disabledSelectButton, setDisabledSelectButton] = useState(false);
  const onClickSelectSubtitleMogrt = async () => {
    setDisabledSelectButton(true);
    const mogrtPath = await evalTS("selectMogrtFile");
    setDisabledSelectButton(false);
    if (mogrtPath !== "") {
      props.setCharacter({
        ...props.character,
        subtitleMogrtPath: mogrtPath,
      });
    }
  };

  const onChangeSubtitleTrackIndex = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      subtitleTrackIndex: value - 1,
    });
  };

  const onChangeSubtitleParamName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    props.setCharacter({
      ...props.character,
      subtitleParamName: value,
    });
  };

  return (
    <div>
      <h2>字幕設定</h2>
      <div className={"flex justify-between items-center"}>
        <p>字幕MOGRT</p>
        <div className={"min-w-0"}>
          <div className={"flex items-center"}>
            <p className={"min-w-0 break-words text-xs"}>
              {props.character.subtitleMogrtPath}
            </p>
            <Button
              onClick={onClickSelectSubtitleMogrt}
              disabled={disabledSelectButton}
            >
              ⚙️️
            </Button>
          </div>
        </div>
      </div>
      <div className={"flex justify-between"}>
        <p>字幕トラック番号</p>
        <input
          className={"text-black"}
          type={"number"}
          value={props.character.subtitleTrackIndex + 1}
          min={1}
          onChange={onChangeSubtitleTrackIndex}
        />
      </div>
      <div className={"flex justify-between"}>
        <p>字幕のプロパティ名</p>
        <input
          className={"text-black"}
          type={"text"}
          value={props.character.subtitleParamName}
          onChange={onChangeSubtitleParamName}
        ></input>
      </div>
    </div>
  );
}
