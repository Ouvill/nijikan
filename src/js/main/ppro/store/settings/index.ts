import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./feature";
import {
  featureDefaultState,
  FeatureState,
  featureSchema,
} from "./feature/state";
import { Characters, charactersSchema } from "./characters/type";
import { characterReducer } from "./characters";
import { charactersDefaultState } from "./characters/state";
import type { JSONSchemaType } from "ajv";
import { STORE } from "../constant";
import watchFolderReducer from "./watchFolder";
import {watchFolderDefaultState, WatchFolderState, watchFolderSchema} from "./watchFolder/state";

export type SettingState = {
  version: number;
  feature: FeatureState;
  characters: Characters;
  watchFolder: WatchFolderState;
};

export const settingDefaultState: SettingState = {
  version: STORE.VERSION,
  feature: featureDefaultState,
  characters: charactersDefaultState,
  watchFolder: watchFolderDefaultState,
};

const setting = combineReducers({
  version: () => settingDefaultState.version,
  feature: featureReducer,
  characters: characterReducer,
  watchFolder: watchFolderReducer,
});

export const settingSchema: JSONSchemaType<SettingState> = {
  type: "object",
  properties: {
    version: { type: "number" },
    feature: featureSchema,
    characters: charactersSchema,
    watchFolder: watchFolderSchema
  },
  required: ["version", "feature", "characters"],
};

export default setting;
