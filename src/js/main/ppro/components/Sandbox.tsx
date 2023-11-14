import Button from "../../../components/Button";
import { csi, evalTS } from "../../../lib/utils/bolt";
import { useEffect } from "react";
import { CSXSEvent } from "../../../type";

export function Sandbox() {
  useEffect(() => {}, []);

  useEffect(() => {
    csi.addEventListener("sampleEvent", (e: CSXSEvent) => {
      alert(e.data);
    });
  }, []);

  const onClick = () => {
    evalTS("sandboxFunc").catch((e) => {
      alert("error catch from react" + e.message);
    });
  };

  return (
    <div>
      <Button onClick={onClick}>test</Button>
    </div>
  );
}
