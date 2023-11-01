import Button from "../../components/button";
import { csi, evalTS } from "../../lib/utils/bolt";
import path from "path";

const publicPath = "/public/";

const state_controller_mogrt = "nijikan_state_controller.mogrt";

const getPublicPath = () => {
  const extensionPath = csi.getSystemPath("extension");
  return path.join(extensionPath, publicPath);
};

const Ppro = () => {
  const track = 1;
  const host = csi.hostEnvironment.appName;

  const importStateControllerMogrt = () => {
    const mogrtPath = path.join(getPublicPath(), state_controller_mogrt);
    evalTS("importMogrt", mogrtPath)
      .then((r) => {})
      .catch((e) => {
        alert(e.message);
      });
  };

  const moveClip = () => {
    evalTS("moveClip", 10).catch((e) => {
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
        <p>表情制御</p>
      </div>
      <div className={"flex flex-col"}>
        <Button onClick={importStateControllerMogrt}>表情クリップ挿入</Button>
        <Button onClick={moveClip}>jikan</Button>
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
