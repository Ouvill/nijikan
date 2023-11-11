import { combineReducers } from "@reduxjs/toolkit";
import featureReducer from "./feature";
import { FeatureState } from "./feature/state";

export type SettingState = {
  feature: FeatureState;
};

const setting = combineReducers({
  feature: featureReducer,
});

export default setting;
