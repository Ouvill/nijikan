import { Layer, Psd, readPsd } from "ag-psd";
import { useRef, useState } from "react";
import { evalTS } from "../../lib/utils/bolt";
import { fs } from "../../lib/cep/node";

const LayerItem = (props: { layer: Layer }) => {
  return (
    <li>
      {props.layer.children ? (
        <ul>
          <p>{props.layer.name}</p>
          {props.layer.children.map((item, index) => (
            <LayerItem key={index} layer={item} />
          ))}
        </ul>
      ) : (
        props.layer.name
      )}
    </li>
  );
};

const Aeft = () => {
  const psdRef = useRef<HTMLDivElement>(null);
  const [psd, setPsd] = useState<Psd | null>(null);

  //再帰的に読み込む
  const printLayerName = (psd: Psd | Layer) => {
    psd.children?.forEach((child) => {
      console.log(child.name);

      if (child.children != null) {
        printLayerName(child);
      }
    });
  };

  const addPsdCanvas = (psd: Psd) => {
    if (psdRef.current != null && psd.canvas != null) {
      psdRef.current.innerHTML = "";
      psd.canvas.className = "w-40";
      psdRef.current.appendChild(psd.canvas);
    }
  };

  const onReadFile = async () => {
    const path = await evalTS("selectFile");
    const buf = await fs.promises.readFile(path);
    return readPsd(buf);
  };

  return (
    <div>
      <h1>After Effects</h1>

      <div ref={psdRef}></div>

      <button
        onClick={async () => {
          const psd = await onReadFile();
          setPsd(psd);
          addPsdCanvas(psd);
        }}
      >
        psd ファイル読み込み
      </button>

      <div>
        <button
          onClick={() => {
            evalTS("createComposionForNijikan").catch((err) => {
              alert(err.message);
            });
          }}
        >
          psdファイルのコンポジションを作成
        </button>
      </div>

      <div>
        <div className={"w-40"} ref={psdRef}></div>
      </div>

      <div>
        <p>レイヤー構造</p>
        <ul>
          {psd?.children?.map((item, index) => (
            <LayerItem key={index} layer={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Aeft;
