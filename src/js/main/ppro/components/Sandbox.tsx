import Button from "../../../components/Button";
import { evalTS } from "../../../lib/utils/bolt";

export function Sandbox() {
  const onClick = () => {
    evalTS("sandboxFunc", {
      mogrtPath:
        "C:\\Users\\youhei\\Creative Cloud Files\\Videos\\material\\motion_graphic_template\\2580x1080_stroke\\ずんだもん.mogrt",
    }).catch((e) => {
      alert("error catch from react"+ e.message);
    });
  };

  return (
    <div>
      <Button onClick={onClick}>test</Button>
    </div>
  );
}
