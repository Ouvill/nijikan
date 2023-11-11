import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./feature";
import {
  featureDefaultState,
  FeatureState,
  featureSchema,
} from "./feature/state";
import { Characters, charactersSchema } from "./characters/type";
import { charactersReducer } from "./characters";
import { charactersDefaultState } from "./characters/state";
import type { JSONSchemaType } from "ajv";
import { STORE } from "../constant";
import watchFolderReducer from "./watchFolder";
import {
  watchFolderDefaultState,
  WatchFolderState,
  watchFolderSchema,
} from "./watchFolder/state";
import {
  selectedCharacterDefaultState,
  selectedCharacterReducer,
  SelectedCharacterState,
} from "./selectedCharacter";

export type SettingState = {
  version: number;
  characters: Characters;
  feature: FeatureState;
  selectedCharacter: SelectedCharacterState;
  watchFolder: WatchFolderState;
};

export const settingDefaultState: SettingState = {
  version: STORE.VERSION,
  characters: charactersDefaultState,
  feature: featureDefaultState,
  selectedCharacter: selectedCharacterDefaultState,
  watchFolder: watchFolderDefaultState,
};

const setting = combineReducers({
  version: () => settingDefaultState.version,
  characters: charactersReducer,
  feature: featureReducer,
  selectedCharacter: selectedCharacterReducer,
  watchFolder: watchFolderReducer,
});

export const settingSchema: JSONSchemaType<SettingState> = {
  type: "object",
  properties: {
    version: { type: "number" },
    characters: charactersSchema,
    feature: featureSchema,
    selectedCharacter: { type: "string" },
    watchFolder: watchFolderSchema,
  },
  required: ["version", "feature", "characters"],
  additionalProperties: false,
};

export default setting;
