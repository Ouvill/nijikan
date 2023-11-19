import React from "react";
import { csi } from "../lib/utils/bolt";
import Aeft from "./aeft";
import Ppro from "./ppro";

const Main = () => {
  const hostEnv = csi.hostEnvironment;
  const appId = hostEnv.appId;

  return (
    <div className={"prose prose-sm dark:prose-invert max-w-none"}>
      {appId === "PPRO" ? <Ppro /> : appId === "AEFT" ? <Aeft /> : <></>}
    </div>
  );
};
export default Main;
