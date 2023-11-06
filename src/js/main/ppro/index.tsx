import { csi } from "../../lib/utils/bolt";
import React, { useState, useReducer } from "react";
import { Store } from "./store";
import { CharacterConfig } from "./components/characterConfig";
import {
  Character,
  characterReducer,
  createInitialState,
  defaultState as characterDefaultState,
  actions as characterActions,
  actions,
} from "./store/characters";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";

const Ppro = () => {
  const host = csi.hostEnvironment.appName;

  const [selectedCharacterId, setSelectedCharacterId] = useState<string>("");

  const [characters, dispatch] = useReducer(
    characterReducer,
    characterDefaultState,
    createInitialState,
  );

  const onClickAddCharacter = () => {
    const id = uuidv4();
    dispatch(characterActions.addCharacter(id));
    setSelectedCharacterId(id);
  };

  const onClickRemoveCharacter = () => {
    const characterIds = Object.keys(characters);
    const index = characterIds.indexOf(selectedCharacterId);
    const nextIndex = index === 0 ? 1 : index - 1;
    const nextId = characterIds[nextIndex];
    dispatch(characterActions.removeCharacter(selectedCharacterId));
    if (nextId) {
      setSelectedCharacterId(nextId);
    } else {
      setSelectedCharacterId("");
    }
  };

  const characterConfigUpdater = (characterId: string) => {
    return (character: Character) => {
      dispatch(actions.updateCharacter({ characterId, character }));
    };
  };

  return (
    <div className={"mx-2"}>
      <h1>{host}</h1>
      <div>
        <h2>キャラクター</h2>
        <div className={"flex flex-col"}>
          <label>
            キャラクター選択
            <select
              value={selectedCharacterId}
              onChange={(e) => {
                setSelectedCharacterId(e.target.value);
              }}
            >
              {Object.entries(characters).map(([id, character]) => (
                <option key={id} value={id}>
                  {character.name}
                </option>
              ))}
            </select>
          </label>
          <div>
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
