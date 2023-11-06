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
import type Chokidar from "chokidar";

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

  const [isWatch, setIsWatch] = useState(false);
  useEffect(() => {
    if (isWatch) {
      const chokidar: typeof Chokidar = require("chokidar");
      console.log("watch start");
      const watch = chokidar
        .watch(watchFolderState.path, {
          ignoreInitial: true,
        })
        .on("all", (event, path) => {
          console.log(event, path);
        });

      return () => {
        watch.close().then(() => {
          console.log("watch close");
        });
      };
    }
  }, [isWatch]);

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
