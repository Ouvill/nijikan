import { csi, evalTS } from "../lib/utils/bolt";
import { useEffect, useState } from "react";
import Aeft from "./aeft";
import Ppro from "./ppro";

const Main = () => {
  const hostEnv = csi.hostEnvironment;
  const appId = hostEnv.appId;

  return (
    <div className={"prose lg:prose-xl dark:prose-invert"}>
      {appId === "PPRO" ? <Ppro /> : appId === "AEFT" ? <Aeft /> : <></>}
    </div>
  );
};
export default Main;
