import { evalTS } from "../lib/utils/bolt";
import { useEffect, useState } from "react";
import Aeft from "./aeft";
import Ppro from "./ppro";

const Main = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    evalTS("appName").then((res) => {
      setName(res);
    });
  }, []);

  return (
    <div className={"bg-red-300 text-white"}>
      {name === "aftereffects" || name === "aftereffectsbeta" ? (
        <Aeft />
      ) : name === "premierepro" || name === "premiereprobeta" ? (
        <Ppro />
      ) : (
        <></>
      )}
    </div>
  );
};
export default Main;
