import { useAppDispatch } from "../../../hooks/useReduxHooks";
import { watchFolderActions } from "../../../store/settings/watchFolder";
import Button from "../../../../../components/Button";
import React from "react";
import { WatchFolderState } from "../../../store/settings/watchFolder/state";
import { FaRegFolder } from "react-icons/fa6";

export function SelectWatchFolder(props: {
  watchFolderState: WatchFolderState;
}) {
  const dispatch = useAppDispatch();

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

  return (
    <div className={"flex justify-between items-center gap-4"}>
      <p>監視フォルダ</p>
      <div className={"min-w-0 flex items-center gap-2"}>
        <p className={"min-w-0 text-xs text-right break-words"}>
          {props.watchFolderState.path}
        </p>
        <Button onClick={onClickSelectFolder}>
          <FaRegFolder className={"h-6"}></FaRegFolder>
        </Button>
      </div>
    </div>
  );
}
