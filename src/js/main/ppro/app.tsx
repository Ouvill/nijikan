import { csi } from "../../lib/utils/bolt";
import React from "react";

import { CharacterConfig } from "./components/CharacterConfig";
import { charactersActions } from "./store/settings/characters";
import Button from "../../components/Button";
import { WatchFolder } from "./components/WatchFolder";
import { Character } from "./store/settings/characters/type";
import { Sandbox } from "./components/Sandbox";
import { useAppDispatch, useAppSelector } from "./hooks/useReduxHooks";
import { useSaveSettings } from "./hooks/useSaveSettings";
import {
  characterCollectionSelector,
  featureSelector,
} from "./store/selectors";
import { useSelectCharacter } from "./hooks/useSelectCharacter";
import { FeatureConfig } from "./components/FeatureConfig";

const PproApp = () => {
  const host = csi.hostEnvironment.appName;

  const dispatch = useAppDispatch();
  const characters = useAppSelector(characterCollectionSelector);
  const features = useAppSelector(featureSelector);

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

  const saveSettings = useSaveSettings();

  return (
    <div className={"mx-2"}>
      <h1>{host}</h1>
      <Sandbox></Sandbox>
      <Button onClick={saveSettings}>設定を保存</Button>
      <WatchFolder characters={characters} features={features} />
      <FeatureConfig></FeatureConfig>
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
