import React, { useEffect, useState } from "react";
import { watchFolderActions } from "../store/settings/watchFolder";
import Button from "../../../components/Button";
import { Characters } from "../store/settings/characters/type";
import { watchAddVoice } from "../libs/watchAddVoice";
import PQueue from "p-queue";
import { insertCharacterTrackItems } from "../libs/insertCharacterTrackItems";
import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
import { watchFolderSelector } from "../store/selectors";

const queue = new PQueue({ concurrency: 1 });

export const WatchFolder = ({ characters }: { characters: Characters }) => {
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
            await insertCharacterTrackItems(path, character);
          });
        },
      );
    }
  }, [isWatch, watchFolderState.path, characters]);

  const toggleWatch = () => {
    setIsWatch(!isWatch);
  };

  return (
    <div>
      <h2>監視フォルダ</h2>
      <p>{watchFolderState.path}</p>
      <Button onClick={onClickSelectFolder}>フォルダ選択</Button>
      <Button>
        <input type={"checkbox"} onChange={toggleWatch} checked={isWatch} />
      </Button>
    </div>
  );
};
