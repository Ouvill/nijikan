import { Character } from "../../store/settings/characters/type";
import React, { useState } from "react";
import { evalTS } from "../../../../lib/utils/bolt";
import Button from "../../../../components/Button";
import {FaRegFolder} from "react-icons/fa6";

export function LipSyncCharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const [disabledSelectButton, setDisabledSelectButton] = useState(false);

  const changeLipSyncTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      lipSyncVidTrackIndex: value - 1,
    });
  };

  const selectLipSyncMogrt = async () => {
    setDisabledSelectButton(true);
    const path = await evalTS("selectMogrtFile");
    setDisabledSelectButton(false);

    if (path !== "") {
      props.setCharacter({
        ...props.character,
        lipSyncMogrtPath: path,
      });
    }
  };

  const insertLipSyncMogrt = async () => {
    if (props.character.lipSyncMogrtPath === "") return;
    evalTS(
      "insertLabMogrt",
      props.character.lipSyncMogrtPath,
      props.character.lipSyncVidTrackIndex,
      props.character.voiceTrackIndex,
    ).catch((e) => {
      alert(e.message);
    });
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h2>口パク制御</h2>
      <div className={"flex justify-between items-center gap-4"}>
        <p>字幕MOGRT</p>
        <div className={"min-w-0"}>
          <div className={"flex items-center gap-2"}>
            <p className={"min-w-0 break-words text-xs"}>
              {props.character.subtitleMogrtPath}
            </p>
            <Button
              onClick={selectLipSyncMogrt}
              disabled={disabledSelectButton}
            >
              <FaRegFolder className={"h-6"}></FaRegFolder>
            </Button>
          </div>
        </div>
      </div>
      <div className={"not-prose"}>
        <div className={"flex justify-between"}>
          <p>口パクトラック番号</p>
          <input
            type={"number"}
            value={props.character.lipSyncVidTrackIndex + 1}
            className={"text-black"}
            onChange={changeLipSyncTrackIndex}
          />
        </div>
      </div>
    </div>
  );
}
