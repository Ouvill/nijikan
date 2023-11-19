import Button from "../../../../components/Button";
import React, { useState } from "react";
import { Character } from "../../store/settings/characters/type";
import { evalTS } from "../../../../lib/utils/bolt";
import { Switch } from "../../../../components/Switch";
import { FaRegFolder } from "react-icons/fa6";
import { Input } from "../../../../components/Input/Input";

type Props = {
  character: Character;
  setCharacter: (character: Character) => void;
};

export const ImageCharacterConfig: React.FC<Props> = (props) => {
  const [disabledSelectButton, setDisabledSelectButton] = useState(false);
  const onClickSelectImage = async () => {
    setDisabledSelectButton(true);
    const imagePath = await evalTS("selectFile", "画像を選択してください");
    setDisabledSelectButton(false);
    if (imagePath !== "" && typeof imagePath === "string") {
      props.setCharacter({
        ...props.character,
        imagePath: imagePath,
      });
    }
  };

  const onChangeImageTrackIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      imageVidTrackIndex: value - 1,
    });
  };

  const onChangeImagePositionX = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      imagePosition: {
        ...props.character.imagePosition,
        x: value,
      },
    });
  };

  const onChangeImagePositionY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      imagePosition: {
        ...props.character.imagePosition,
        y: value,
      },
    });
  };

  const onChangeScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    props.setCharacter({
      ...props.character,
      imageScale: value,
    });
  };

  const onChangeHorizontalFlip = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setCharacter({
      ...props.character,
      imageHorizontalFlip: e.target.checked,
    });
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h2>キャラ画像</h2>
      <div className={"flex justify-between items-center gap-4"}>
        <p>キャラ画像パス</p>
        <div className={"min-w-0"}>
          <div className={"flex items-center gap-2"}>
            <p className={"min-w-0 break-words text-xs"}>
              {props.character.imagePath}
            </p>
            <Button
              onClick={onClickSelectImage}
              disabled={disabledSelectButton}
            >
              <FaRegFolder className={"h-6"}></FaRegFolder>
            </Button>
          </div>
        </div>
      </div>
      <div className={"flex justify-between"}>
        <p>キャラ画像トラック番号</p>
        <Input
          className={"text-black"}
          type={"number"}
          value={props.character.imageVidTrackIndex + 1}
          min={1}
          onChange={onChangeImageTrackIndex}
        />
      </div>
      <div className={"flex justify-between"}>
        <p>位置</p>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex gap-2"}>
            <p>X: </p>
            <Input
              type={"number"}
              className={"w-20 text-stone-900"}
              value={props.character.imagePosition.x}
              onChange={onChangeImagePositionX}
            />
          </div>
          <div className={"flex gap-2"}>
            <p>Y: </p>
            <Input
              type={"number"}
              className={"w-20 text-stone-900"}
              value={props.character.imagePosition.y}
              onChange={onChangeImagePositionY}
            ></Input>
          </div>
        </div>
      </div>
      <div className={"flex justify-between"}>
        <p>スケール</p>
        <Input
          className={"text-black"}
          type={"number"}
          value={props.character.imageScale}
          min={0}
          onChange={onChangeScale}
        />
      </div>
      <div className={"flex justify-between"}>
        <p>左右反転</p>
        <Switch
          checked={props.character.imageHorizontalFlip}
          onChange={onChangeHorizontalFlip}
        />
      </div>
    </div>
  );
};
