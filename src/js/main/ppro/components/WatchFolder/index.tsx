import React from "react";
import { watchFolderActions } from "../../store/settings/watchFolder";
import Button from "../../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { watchFolderSelector } from "../../store/selectors";
import { ToggleButton } from "../../../../components/ToggleButton";

export const WatchFolder = () => {
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

  const toggleWatch = () => {
    if (!watchFolderState.isWatching && watchFolderState.path === "") {
      alert("監視フォルダを選択してください");
      return;
    }

    dispatch(watchFolderActions.setWatching(!watchFolderState.isWatching));
  };

  return (
    <div>
      <div>
        <p>ボイス監視</p>
      </div>
      <div className={"flex justify-center items-center py-8"}>
        <ToggleButton
          checked={watchFolderState.isWatching}
          onChange={toggleWatch}
        ></ToggleButton>
      </div>
      <div className={"flex justify-between items-center gap-2"}>
        <p className={"min-w-0 text-xs text-right break-words"}>
          {watchFolderState.path}
        </p>
        <Button onClick={onClickSelectFolder}>フォルダ選択</Button>
      </div>
    </div>
  );
};
