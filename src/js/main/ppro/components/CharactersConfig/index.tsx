import Button from "../../../../components/Button";
import { CharacterConfig } from "../CharacterConfig";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { characterCollectionSelector } from "../../store/selectors";
import { useSelectCharacter } from "../../hooks/useSelectCharacter";
import { Character } from "../../store/settings/characters/type";
import { charactersActions } from "../../store/settings/characters";

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

  return (
    <div>
      <div>
        <div className={"flex flex-col"}>
          <label>
            <div className={""}>
              <p>キャラクター選択</p>
              <div className={"grid grid-cols-3 gap-0.5"}>
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
          <div className={"flex justify-end my-2"}>
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
          onClick={onClickRemoveCharacter}
        >
          キャラクターを削除
        </Button>
      </div>
    </div>
  );
};
