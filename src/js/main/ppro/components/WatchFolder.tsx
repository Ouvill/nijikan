import React, { useEffect, useReducer, useState } from "react";
import {
  createWatchFolderInitialState,
  saveWatchFolderToLocalStorage,
  watchFolderActions,
  watchFolderDefaultState,
  watchFolderReducer,
} from "../store/watchFolder";
import { evalTS } from "../../../lib/utils/bolt";
import Button from "../../../components/Button";
import { Characters } from "../store/characters/type";
import { watchAddVoice } from "../libs/watchAddVoice";
import PQueue from "p-queue";
import { insertCharacterTrackItems } from "../libs/insertCharacterTrackItems";

const queue = new PQueue({ concurrency: 1 });

export const WatchFolder = ({ characters }: { characters: Characters }) => {
  const [watchFolderState, watchFolderDispatch] = useReducer(
    watchFolderReducer,
    watchFolderDefaultState,
    createWatchFolderInitialState,
  );

  const onClickSelectFolder = async () => {
    const path = await evalTS("selectFolder").catch((e) => {
      alert(e.message);
    });

    if (path !== "") {
      watchFolderDispatch(
        watchFolderActions.setWatchFolder({
          path: path,
          saveFunc: saveWatchFolderToLocalStorage,
        }),
      );
    }
  };

  const [isWatch, setIsWatch] = useState(false);
  useEffect(() => {
    if (isWatch) {
      return watchAddVoice(
        watchFolderState.path,
        characters,
        (path, character) => {
          queue.add(async () => {
            await insertCharacterTrackItems(path, character);
          });
        },
      );
    }
  }, [isWatch, characters]);

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
