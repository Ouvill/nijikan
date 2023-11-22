import React, { useState } from "react";

import Button from "../../components/Button";
import { WatchFolder } from "./components/WatchFolder";
import { Sandbox } from "./components/Sandbox";
import { CharactersConfig } from "./components/CharactersConfig";
import { AppConfig } from "./components/AppConfig";
import { useAppSelector } from "./hooks/useReduxHooks";
import { watchFolderSelector } from "./store/selectors";

type Pages = "index" | "feature" | "characters";

const PproApp = () => {
  const [page, setPage] = useState<Pages>("index");
  const openPage = (page: Pages) => {
    setPage(page);
  };
  const closePage = () => {
    setPage("index");
  };

  const watchFolderState = useAppSelector(watchFolderSelector);

  return (
    <div className={"mx-2 not-prose mt-4"}>
      <div className={"flex flex-col gap-4"}>
        <WatchFolder />
        <div
          className={[
            watchFolderState.isWatching ? "" : "invisible",
            "flex",
            "justify-end",
          ].join(" ")}
        >
          <p>設定を変更するときはボイス監視を無効にしてください</p>
        </div>
        <div className={"flex justify-end gap-2"}>
          {process.env.NODE_ENV === "development" && <Sandbox></Sandbox>}
          <Button
            onClick={() => {
              if (page != "feature") {
                openPage("feature");
              } else {
                closePage();
              }
            }}
            className={`${
              page === "feature" && !watchFolderState.isWatching
                ? "bg-gray-800"
                : ""
            }`}
            disabled={watchFolderState.isWatching}
          >
            アプリ設定
          </Button>
          <Button
            className={`${
              page === "characters" && !watchFolderState.isWatching
                ? "bg-gray-800"
                : ""
            }`}
            onClick={() => {
              if (page != "characters") {
                openPage("characters");
              } else {
                closePage();
              }
            }}
            disabled={watchFolderState.isWatching}
          >
            キャラクター設定
          </Button>
        </div>
      </div>

      {page === "feature" && !watchFolderState.isWatching && (
        <div className={"flex flex-col my-4 gap-2"}>
          <p className={"text-2xl"}>アプリ設定</p>
          <AppConfig />
          <div className={"flex justify-end"}>
            <Button onClick={closePage}>閉じる</Button>
          </div>
        </div>
      )}
      {page === "characters" && !watchFolderState.isWatching && (
        <div className={"flex flex-col my-4 gap-2"}>
          <CharactersConfig />
          <div className={"flex justify-end"}>
            <Button onClick={closePage}>閉じる</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PproApp;
