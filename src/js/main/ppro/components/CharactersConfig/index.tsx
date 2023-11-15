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

  const onChangeSelectedCharacterId = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    selectCharacter(e.target.value);
  };

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
        <h2>キャラクター</h2>
        <p>selected: {selectedCharacterId}</p>
        <div className={"flex flex-col"}>
          <label>
            <div className={"flex justify-between"}>
              <p>キャラクター選択</p>
              <select
                value={selectedCharacterId}
                onChange={onChangeSelectedCharacterId}
                className={"text-black"}
              >
                {Object.entries(characters).map(([id, character]) => (
                  <option key={id} value={id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <div className={"flex justify-end"}>
            <Button onClick={onClickAddCharacter}>+</Button>
            <Button onClick={onClickRemoveCharacter}>-</Button>
          </div>
        </div>
      </div>

      {characters[selectedCharacterId] && (
        <CharacterConfig
          character={characters[selectedCharacterId]}
          setCharacter={characterConfigUpdater(selectedCharacterId)}
        ></CharacterConfig>
      )}
    </div>
  );
};
