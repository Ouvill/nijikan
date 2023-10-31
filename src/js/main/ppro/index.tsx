import Button from "../../components/button";

const Ppro = () => {
  const track = 1;

  return (
    <div>
      <h1>Premiere Pro</h1>
      <div>
        <p>キャラクター設定</p>
        <p>立ち絵ファイル</p>
        <Button>立ち絵読み込み</Button>
      </div>

      <div>
        <p>表情制御</p>
      </div>
      <div className={"flex flex-col"}>
        <Button>表情クリップ挿入</Button>
        <Button>表情クリップを変更/反映</Button>
      </div>
    </div>
  );
};

export default Ppro;
