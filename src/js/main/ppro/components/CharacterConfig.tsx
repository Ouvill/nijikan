import { evalTS } from "../../../lib/utils/bolt";
import path from "path";
import React from "react";
import Button from "../../../components/Button";
import { getPublicPath } from "../libs/getPublicPath";

import { Character } from "../store/characters/type";

const state_controller_mogrt = "nijikan_state_controller.mogrt";

export function CharacterConfig(props: {
  character: Character;
  setCharacter: (character: Character) => void;
}) {
  const selectKutipakuMogrt = async () => {
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

  const onChangeSubtitleTrackIndex = (
      e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      subtitleTrackIndex: value - 1,
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

  const changeCharacterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setCharacter({
      ...props.character,
      name: e.target.value,
    });
  };

  const onClickEditSubtitleMogrt = async () => {
    const mogrtPath = await evalTS("selectMogrtFile");
    if (mogrtPath !== "") {
      props.setCharacter({
        ...props.character,
        subtitleMogrtPaths: [mogrtPath],
      });
    }
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

        <div className={"flex justify-between items-center"}>
          <p>字幕MOGRT</p>
          <div className={"min-w-0"}>
            <div className={"flex items-center"}>
              <p className={"min-w-0 break-words text-xs"}>
                {props.character.subtitleMogrtPaths}
              </p>
              <Button onClick={onClickEditSubtitleMogrt}>⚙️️</Button>
            </div>
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
      <p>立ち絵ファイル</p>
      <Button>立ち絵読み込み</Button>
      <div>
        <h2>口パク制御</h2>
        <div className={"not-prose"}>
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
