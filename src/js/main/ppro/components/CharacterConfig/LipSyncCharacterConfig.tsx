import { Character } from "../../store/settings/characters/type";
import React from "react";
import { evalTS } from "../../../../lib/utils/bolt";
import Button from "../../../../components/Button";

export function LipSyncCharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const changeLipSyncTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      lipSyncVidTrackIndex: value - 1,
    });
  };

  const selectLipSyncMogrt = async () => {
    try {
      const path = await evalTS("selectMogrtFile").catch((e) => {
        throw e;
      });
      if (path !== "" && typeof path === "string") {
        props.setCharacter({
          ...props.character,
          lipSyncMogrtPath: path,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
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
    <div>
      <h2>口パク制御</h2>
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
      <div>
        {props.character.lipSyncMogrtPath ? (
          <p>{props.character.lipSyncMogrtPath}</p>
        ) : (
          <></>
        )}
        <div className={"flex justify-end"}>
          <Button onClick={selectLipSyncMogrt}>口パクMOGRT指定</Button>
          <Button onClick={insertLipSyncMogrt}>口パクMOGRT挿入</Button>
        </div>
      </div>
    </div>
  );
}
