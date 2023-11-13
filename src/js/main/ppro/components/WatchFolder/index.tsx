import React, { useEffect, useState } from "react";
import { watchFolderActions } from "../../store/settings/watchFolder";
import Button from "../../../../components/Button";
import { Characters } from "../../store/settings/characters/type";
import { watchAddVoice } from "../../libs/watchAddVoice";
import { insertCharacterTrackItems } from "../../libs/insertCharacterTrackItems";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { watchFolderSelector } from "../../store/selectors";
import { FeatureState } from "../../store/settings/feature/state";
import { ToggleButton } from "../../../../components/ToggleButton";
import { queue } from "../../libs/queue";

export const WatchFolder = ({
  characters,
  features,
}: {
  characters: Characters;
  features: FeatureState;
}) => {
  const dispatch = useAppDispatch();
  const watchFolderState = useAppSelector(watchFolderSelector);

  const onClickSelectFolder = async () => {
    try {
      const result = window.cep.fs.showOpenDialogEx(
        false,
        true,
        "Select a folder",
        null,
        null,
        null,
      );

      if (result.err !== 0) return;

      const dirPath: string[] = result.data;
      const shifted = dirPath.shift();
      if (typeof shifted === "string" && shifted !== "") {
        dispatch(
          watchFolderActions.setWatchFolder({
            path: shifted,
          }),
        );
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  const [isWatch, setIsWatch] = useState(false);
  useEffect(() => {
    if (isWatch && watchFolderState.path !== "") {
      return watchAddVoice(
        watchFolderState.path,
        characters,
        (path, character) => {
          console.log("add voice", path, character);
          queue.add(async () => {
            await insertCharacterTrackItems(path, character, features);
          });
        },
      );
    }
  }, [isWatch, watchFolderState.path, characters, features]);

  const toggleWatch = () => {
    if (!isWatch && watchFolderState.path === "") {
      alert("監視フォルダを選択してください");
      return;
    }

    setIsWatch(!isWatch);
  };

  return (
    <div>
      <div>
        <p>ボイス監視</p>
      </div>
      <div className={"flex justify-center items-center py-8"}>
        <ToggleButton checked={isWatch} onChange={toggleWatch}></ToggleButton>
      </div>
      <div className={"flex justify-between gap-2"}>
        <p className={"min-w-0 text-xs text-right break-words"}>
          {watchFolderState.path.length > 30
            ? `${watchFolderState.path.slice(-30)}`
            : watchFolderState.path}
        </p>
        <Button onClick={onClickSelectFolder}>フォルダ選択</Button>
      </div>
    </div>
  );
};
