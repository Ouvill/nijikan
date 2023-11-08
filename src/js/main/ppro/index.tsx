import { csi } from "../../lib/utils/bolt";
import React, { useMemo, useReducer, useState } from "react";
import { CharacterConfig } from "./components/characterConfig";
import {
  actions as characterActions,
  characterReducer,
  createInitialState,
} from "./store/characters";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";
import {
  loadSelectedCharacterIdFromLocalStorage,
  saveSelectedCharacterIdToLocalStorage,
} from "./store/selectedCharacter";
import { WatchFolder } from "./components/WatchFolder";
import { defaultState as characterDefaultState } from "./store/characters/defaultState";
import { Character } from "./store/characters/type";
import { Sandbox } from "./components/Sandbox";

const Ppro = () => {
  const host = csi.hostEnvironment.appName;

  const [characters, dispatch] = useReducer(
    characterReducer,
    characterDefaultState,
    createInitialState,
  );

  const initialSelectedCharacterId = useMemo(() => {
    const id = loadSelectedCharacterIdFromLocalStorage();
    if (id) return id;

    const characterIds = Object.keys(characters);
    if (characterIds.length > 0) {
      return characterIds[0];
    }

    return "";
  }, []);

  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
    initialSelectedCharacterId,
  );

  const onChangeSelectedCharacterId = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCharacterId(e.target.value);
    saveSelectedCharacterIdToLocalStorage(e.target.value);
  };

  const onClickAddCharacter = () => {
    const id = uuidv4();
    dispatch(characterActions.addCharacter(id));
    setSelectedCharacterId(id);
    saveSelectedCharacterIdToLocalStorage(id);
  };

  const onClickRemoveCharacter = () => {
    const characterIds = Object.keys(characters);
    const index = characterIds.indexOf(selectedCharacterId);
    const nextIndex = index === 0 ? 1 : index - 1;
    const nextId = characterIds[nextIndex];
    dispatch(characterActions.removeCharacter(selectedCharacterId));
    if (nextId) {
      setSelectedCharacterId(nextId);
      saveSelectedCharacterIdToLocalStorage(nextId);
    } else {
      setSelectedCharacterId("");
      saveSelectedCharacterIdToLocalStorage("");
    }
  };

  const characterConfigUpdater = (characterId: string) => {
    return (character: Character) => {
      dispatch(characterActions.updateCharacter({ characterId, character }));
    };
  };
  return (
    <div className={"mx-2"}>
      <h1>{host}</h1>
      <Sandbox></Sandbox>
      <WatchFolder characters={characters} />
      <div>
        <h2>キャラクター</h2>
        <div className={"flex flex-col"}>
          <label>
            <div className={"not-prose flex justify-between"}>
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

export default Ppro;
