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

export type SettingState = {
  version: number;
  feature: FeatureState;
  characters: Characters;
};

export const settingDefaultState: SettingState = {
  version: STORE.VERSION,
  feature: featureDefaultState,
  characters: charactersDefaultState,
};

const setting = combineReducers({
  version: () => settingDefaultState.version,
  feature: featureReducer,
  characters: characterReducer,
});

export const settingSchema: JSONSchemaType<SettingState> = {
  type: "object",
  properties: {
    version: { type: "number" },
    feature: featureSchema,
    characters: charactersSchema,
  },
  required: ["version", "feature", "characters"],
};

export default setting;
