import Button from "../../components/button";
import { csi, evalTS } from "../../lib/utils/bolt";
import path from "path";
import { useState } from "react";

const publicPath = "/public/";

const state_controller_mogrt = "nijikan_state_controller.mogrt";

const getPublicPath = () => {
  const extensionPath = csi.getSystemPath("extension");
  return path.join(extensionPath, publicPath);
};

const Ppro = () => {
  const host = csi.hostEnvironment.appName;

  const kutipakuTrack = 1;
  const voiceTruck = 2;
  const [kutipakuMogrtPath, setKutipakuMogrtPath] = useState<string>("");
  const selectKutipakuMogrt = async () => {
    const path = await evalTS("selectMogrtFile");
    if (path !== "") {
      setKutipakuMogrtPath(path);
    }
  };

  const importStateControllerMogrt = () => {
    const mogrtPath = path.join(getPublicPath(), state_controller_mogrt);
    evalTS("importMogrt", mogrtPath).catch((e) => {
      alert(e.message);
    });
  };

  const insertKutipakuMogrt = async () => {
    if (kutipakuMogrtPath === "") return;
    evalTS(
      "insertLabMogrt",
      kutipakuMogrtPath,
      kutipakuTrack,
      voiceTruck,
    ).catch((e) => {
      alert(e.message);
    });
  };

  const moveClip = () => {
    evalTS("moveClip", 10).catch((e) => {
      alert(e.message);
    });
  };

  const alertClips = () => {
    evalTS("alertTracks").catch((e) => {
      alert(e.message);
    });
  };

  return (
    <div>
      <h1>{host}</h1>
      <h1>Premiere Pro</h1>

      <div>
        <p>動かない</p>
        <p>キャラクター設定</p>
        <p>立ち絵ファイル</p>
        <Button>立ち絵読み込み</Button>
      </div>

      <div>
        <p>口パク制御</p>
        <Button onClick={selectKutipakuMogrt}>口パクMOGRT指定</Button>
        {kutipakuMogrtPath ? <p>{kutipakuMogrtPath}</p> : <></>}
        <Button onClick={insertKutipakuMogrt}>口パクMOGRT挿入</Button>
      </div>

      <div>
        <p>表情制御</p>
      </div>
      <div className={"flex flex-col"}>
        <Button onClick={importStateControllerMogrt}>表情クリップ挿入</Button>
        <Button onClick={moveClip}>moveClip</Button>
        <Button onClick={alertClips}>alertClips</Button>
        <Button>表情クリップを変更/反映</Button>
      </div>
      <div>
        <p>データ送信</p>

        <Button>表情データを反映</Button>
      </div>
    </div>
  );
};

export default Ppro;
