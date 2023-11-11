import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./feature";
import { featureDefaultState, FeatureState } from "./feature/state";
import { Characters } from "./characters/type";
import { characterReducer } from "./characters";
import { charactersDefaultState } from "./characters/state";

export type SettingState = {
  feature: FeatureState;
  characters: Characters;
};

const setting = combineReducers({
  feature: featureReducer,
  characters: characterReducer,
});

export const settingDefaultState: SettingState = {
  feature: featureDefaultState,
  characters: charactersDefaultState,
};

export default setting;
