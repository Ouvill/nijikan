import { Layer, Psd, readPsd } from "ag-psd";
import { useEffect, useRef, useState } from "react";
import { evalTS } from "../../lib/utils/bolt";




const Aeft = () => {
  const psdRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState<string>("");

  const [path, setPath] = useState<string>("");

  //再帰的に読み込む
  const printLayerName = (psd: Psd | Layer) => {
    psd.children?.forEach((child) => {
      console.log(child.name);

      if (child.children != null) {
        printLayerName(child);
      }
    });
  };

  return (
    <div>
      <h1>After Effects</h1>

      <div ref={psdRef}></div>

      <input
        type={"file"}
        onChange={(e) => {
          if (e.target.files != null && e.target.files.length > 0) {
            e.target.files[0].arrayBuffer().then((buffer) => {
              const psd = readPsd(buffer);

              printLayerName(psd);

              if (psdRef.current != null && psd.canvas != null) {
                psdRef.current.innerHTML = "";
                psd.canvas.className = "w-40";
                psdRef.current.appendChild(psd.canvas);
              }
            });
          }
        }}
      />

      <div>
        <div className={"w-40"} ref={psdRef}></div>
      </div>
    </div>
  );
};

export default Aeft;
