import React, { useReducer } from "react";
import {
  createWatchFolderInitialState,
  saveWatchFolderToLocalStorage,
  watchFolderActions,
  watchFolderDefaultState,
  watchFolderReducer,
} from "../store/watchFolder";
import { evalTS } from "../../../lib/utils/bolt";
import Button from "../../../components/Button";

export const WatchFolder = () => {
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

  return (
    <div>
      <h2>監視フォルダ</h2>
      <p>{watchFolderState.path}</p>
      <Button onClick={onClickSelectFolder}>フォルダ選択</Button>
    </div>
  );
};