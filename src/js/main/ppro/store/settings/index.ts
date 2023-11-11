import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./feature";
import { FeatureState } from "./feature/state";
import { Characters } from "./characters/type";
import { characterReducer } from "./characters";

export type SettingState = {
  feature: FeatureState;
  characters: Characters;
};

const setting = combineReducers({
  feature: featureReducer,
  characters: characterReducer,
});

export default setting;
