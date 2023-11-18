import { csi } from "../../lib/utils/bolt";
import React, { useState } from "react";

import Button from "../../components/Button";
import { WatchFolder } from "./components/WatchFolder";
import { Sandbox } from "./components/Sandbox";
import { CharactersConfig } from "./components/CharactersConfig";
import { AppConfig } from "./components/AppConfig";

type Pages = "index" | "feature" | "characters";

const PproApp = () => {
  const host = csi.hostEnvironment.appName;
  const [page, setPage] = useState<Pages>("index");
  const openPage = (page: Pages) => {
    setPage(page);
  };
  const closePage = () => {
    setPage("index");
  };

  return (
    <div className={"mx-2 not-prose"}>
      <h1>{host}</h1>
      <div className={"flex flex-col gap-4"}>
        <WatchFolder />
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
            className={`${page === "feature" ? "bg-gray-800" : ""}`}
          >
            アプリ設定
          </Button>
          <Button
            className={`${page === "characters" ? "bg-gray-800" : ""}`}
            onClick={() => {
              if (page != "characters") {
                openPage("characters");
              } else {
                closePage();
              }
            }}
          >
            キャラクター設定
          </Button>
        </div>
      </div>

      {page === "feature" && (
        <div className={"flex flex-col my-4 gap-2"}>
          <p>アプリ設定</p>
          <AppConfig />
          <div className={"flex justify-end"}>
            <Button onClick={closePage}>閉じる</Button>
          </div>
        </div>
      )}
      {page === "characters" && (
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
