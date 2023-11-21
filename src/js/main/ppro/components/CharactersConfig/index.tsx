import Button from "../../../../components/Button";
import { CharacterConfig } from "../CharacterConfig";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { characterCollectionSelector } from "../../store/selectors";
import { useSelectCharacter } from "../../hooks/useSelectCharacter";
import { Character } from "../../store/settings/characters/type";
import { charactersActions } from "../../store/settings/characters";
import { createPortal } from "react-dom";
import { Modal } from "../../../../components/Modal";

export const CharactersConfig = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(characterCollectionSelector);
  const {
    selectedCharacterId,
    selectCharacter,
    addCharacter,
    removeSelectedCharacter,
  } = useSelectCharacter();

  const onClickAddCharacter = () => {
    addCharacter();
  };

  const onClickRemoveCharacter = () => {
    removeSelectedCharacter();
  };

  const characterConfigUpdater = (characterId: string) => {
    return (character: Character) => {
      dispatch(charactersActions.updateCharacter({ characterId, character }));
    };
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <div className={"flex flex-col"}>
          <label>
            <div className={""}>
              <p className={"text-2xl"}>キャラクター選択</p>
              <div className={"grid grid-cols-3 gap-0.5 mt-2"}>
                {Object.entries(characters).map(([id, character]) => (
                  <div
                    key={id}
                    className={[
                      "bg-gray-700 ",
                      "hover:bg-gray-800 ",
                      "active:bg-gray-900",
                      "text-center",
                      `${id === selectedCharacterId ? "bg-gray-800" : ""}`,
                      "transition",
                    ].join(" ")}
                    onClick={() => {
                      selectCharacter(id);
                    }}
                  >
                    {character.name}
                  </div>
                ))}
              </div>
            </div>
          </label>
          <div className={"flex justify-end mt-8"}>
            <Button onClick={onClickAddCharacter}>
              キャラクター設定を追加
            </Button>
          </div>
        </div>
      </div>

      {characters[selectedCharacterId] && (
        <CharacterConfig
          character={characters[selectedCharacterId]}
          setCharacter={characterConfigUpdater(selectedCharacterId)}
        ></CharacterConfig>
      )}
      <div className={"flex justify-end my-4"}>
        <Button
          className={"bg-red-900 hover:bg-red-950 active:bg-red-950"}
          onClick={() => {
            setShowModal(true);
          }}
        >
          キャラクターを削除
        </Button>
        {showModal &&
          createPortal(
            <Modal onClose={() => setShowModal(false)}>
              <div className={"py-10 px-20"}>
                <p>キャラクター設定を削除しますか</p>
                <div className={"flex gap-4 justify-end"}>
                  <Button
                    className={"bg-red-900 hover:bg-red-950 active:bg-red-950"}
                    onClick={onClickRemoveCharacter}
                  >
                    削除
                  </Button>
                  <Button onClick={closeModal}>キャンセル</Button>
                </div>
              </div>
            </Modal>,
            document.body,
          )}
      </div>
    </div>
  );
};
