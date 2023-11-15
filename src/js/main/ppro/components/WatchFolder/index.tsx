import React from "react";
import { watchFolderActions } from "../../store/settings/watchFolder";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { watchFolderSelector } from "../../store/selectors";
import { ToggleButton } from "../../../../components/ToggleButton";

export const WatchFolder = () => {
  const dispatch = useAppDispatch();
  const watchFolderState = useAppSelector(watchFolderSelector);

  const toggleWatch = () => {
    if (!watchFolderState.isWatching && watchFolderState.path === "") {
      alert("監視フォルダを選択してください");
      return;
    }

    dispatch(watchFolderActions.setWatching(!watchFolderState.isWatching));
  };

  return (
    <div className={"flex justify-between"}>
      <div>
        <p>ボイス監視</p>
      </div>
      <div className={"flex justify-center items-center"}>
        <ToggleButton
          checked={watchFolderState.isWatching}
          onChange={toggleWatch}
        ></ToggleButton>
      </div>
    </div>
  );
};
