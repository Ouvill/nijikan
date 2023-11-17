import { Character } from "../../store/settings/characters/type";
import { evalTS } from "../../../../lib/utils/bolt";
import React, { useState } from "react";
import Button from "../../../../components/Button";
import { FaRegFolder } from "react-icons/fa6";
import {Input} from "../../../../components/Input/Input";

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
    <div className={"flex flex-col gap-2"}>
      <h2>字幕設定</h2>
      <div className={"flex justify-between items-center gap-4"}>
        <p>字幕MOGRT</p>
        <div className={"min-w-0"}>
          <div className={"flex items-center gap-2"}>
            <p className={"min-w-0 break-words text-xs"}>
              {props.character.subtitleMogrtPath}
            </p>
            <Button
              onClick={onClickSelectSubtitleMogrt}
              disabled={disabledSelectButton}
            >
              <FaRegFolder className={"h-6"}></FaRegFolder>
            </Button>
          </div>
        </div>
      </div>
      <div className={"flex justify-between"}>
        <p>字幕トラック番号</p>
        <Input
          className={"text-black"}
          type={"number"}
          value={props.character.subtitleTrackIndex + 1}
          min={1}
          onChange={onChangeSubtitleTrackIndex}
        />
      </div>
      <div className={"flex justify-between"}>
        <p>字幕のプロパティ名</p>
        <Input
          className={"text-black"}
          type={"text"}
          value={props.character.subtitleParamName}
          onChange={onChangeSubtitleParamName}
        ></Input>
      </div>
    </div>
  );
}
