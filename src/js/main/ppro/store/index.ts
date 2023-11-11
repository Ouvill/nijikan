import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setting, { settingSchema } from "./settings";
import { defaultState, State } from "./state";
import Ajv from "ajv";
import { STORE } from "./constant";

const rootReducer = combineReducers({
  setting: setting,
});

const loadState = (): State | undefined => {
  if (typeof localStorage === "undefined") return;
  const state = localStorage.getItem(STORE.SETTING_KEY);
  if (!state) return;
  const parsedSetting = JSON.parse(state);
  const ajv = new Ajv();
  const validate = ajv.compile(settingSchema);
  const valid = validate(parsedSetting);
  if (!valid) {
    console.log(validate.errors);
    return;
  }
  return {
    ...defaultState,
    setting: parsedSetting,
  };
};

const initialState = loadState() || defaultState;

export const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
