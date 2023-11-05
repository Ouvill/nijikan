import { evalTS } from "../../../lib/utils/bolt";
import path from "path";
import React from "react";
import Button from "../../../components/button";
import { getPublicPath } from "../utils/getPublicPath";
import { Character } from "../store/characters";

const state_controller_mogrt = "nijikan_state_controller.mogrt";

export function CharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const selectKutipakuMogrt = async () => {
    const path = await evalTS("selectMogrtFile");
    if (path !== "") {
      props.setCharacter({
        ...props.character,
        lipSyncMogrtPath: path,
      });
    }
  };

  const changeVoiceTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      voiceTrackIndex: value - 1,
    });
  };

  const changeLipSyncTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      lipSyncVidTrackIndex: value - 1,
    });
  };

  const importStateControllerMogrt = () => {
    const mogrtPath = path.join(getPublicPath(), state_controller_mogrt);
    evalTS("importMogrt", mogrtPath).catch((e) => {
      alert(e.message);
    });
  };

  const insertKutipakuMogrt = async () => {
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

  return (
    <div>
      <div>
        <p>キャラクター設定</p>
        <p>立ち絵ファイル</p>
        <Button>立ち絵読み込み</Button>
      </div>

      <div>
        <h2>口パク制御</h2>
        <div className={"not-prose"}>
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
          <div className={"flex justify-between"}>
            <p>挿入先トラック番号</p>
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
            <Button onClick={selectKutipakuMogrt}>口パクMOGRT指定</Button>
            <Button onClick={insertKutipakuMogrt}>口パクMOGRT挿入</Button>
          </div>
        </div>
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
