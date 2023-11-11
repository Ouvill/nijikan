import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Character } from "./settings/characters/type";
import setting, { SettingState } from "./settings";

export type State = {
  setting: SettingState;
};

const rootReducer = combineReducers<State>({
  setting: setting,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
