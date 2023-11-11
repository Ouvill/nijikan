import { csi } from "../../lib/utils/bolt";
import React, { useMemo, useState } from "react";

import { CharacterConfig } from "./components/CharacterConfig";
import { actions as characterActions } from "./store/settings/characters";
import Button from "../../components/Button";
import { v4 as uuidv4 } from "uuid";
import { WatchFolder } from "./components/WatchFolder";
import { Character } from "./store/settings/characters/type";
import { Sandbox } from "./components/Sandbox";
import { useAppDispatch, useAppSelector } from "./hooks/useReduxHooks";
import { useSaveSettings } from "./hooks/useSaveSettings";
import { selectedCharacterActions } from "./store/settings/selectedCharacter";
import {selectedCharacterSelector} from "./store/settings/selectors";

const PproApp = () => {
  const host = csi.hostEnvironment.appName;

  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.setting.characters);
  const selectedCharacterId = useAppSelector(selectedCharacterSelector);

  const onChangeSelectedCharacterId = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(selectedCharacterActions.setSelectedCharacter(e.target.value));
  };

  const onClickAddCharacter = () => {
    const id = uuidv4();
    dispatch(characterActions.addCharacter(id));
    dispatch(selectedCharacterActions.setSelectedCharacter(id));
  };

  const onClickRemoveCharacter = () => {
    const characterIds = Object.keys(characters);
    const index = characterIds.indexOf(selectedCharacterId);
    const nextIndex = index === 0 ? 1 : index - 1;
    const nextId = characterIds[nextIndex];
    dispatch(characterActions.removeCharacter(selectedCharacterId));
    if (nextId) {
      dispatch(selectedCharacterActions.setSelectedCharacter(nextId));
    } else {
      dispatch(selectedCharacterActions.setSelectedCharacter(""));
    }
  };

  const characterConfigUpdater = (characterId: string) => {
    return (character: Character) => {
      dispatch(characterActions.updateCharacter({ characterId, character }));
    };
  };

  const saveSettings = useSaveSettings();

  return (
    <div className={"mx-2"}>
      <h1>{host}</h1>
      <Sandbox></Sandbox>
      <Button onClick={saveSettings}>設定を保存</Button>
      <WatchFolder characters={characters} />
      <div>
        <h2>キャラクター</h2>
        <p>selected: {selectedCharacterId}</p>
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

export default PproApp;
