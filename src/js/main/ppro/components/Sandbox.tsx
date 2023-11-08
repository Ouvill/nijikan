import Button from "../../../components/Button";
import { evalTS } from "../../../lib/utils/bolt";

export function Sandbox() {
  const onClick = () => {
    evalTS("testAddAudioTrack").catch((e) => {
      alert(e.message);
    });
  };

  return (
    <div>
      <Button onClick={onClick}>test</Button>
    </div>
  );
}
