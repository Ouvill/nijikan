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
import { CharactersConfig } from "./components/CharactersConfig";

const PproApp = () => {
  const host = csi.hostEnvironment.appName;

  const features = useAppSelector(featureSelector);

  const saveSettings = useSaveSettings();

  return (
    <div className={"mx-2 not-prose"}>
      <h1>{host}</h1>
      <Sandbox></Sandbox>
      <Button onClick={saveSettings}>設定を保存</Button>
      <WatchFolder />
      <FeatureConfig></FeatureConfig>
      <CharactersConfig></CharactersConfig>
    </div>
  );
};

export default PproApp;
