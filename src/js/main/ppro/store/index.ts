import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setting, { settingSchema } from "./settings";
import { defaultState, State } from "./state";
import Ajv from "ajv";
import { getSavePath, readJsonFile } from "../libs/saveSettingsToJson";
import { saveToJsonFile } from "./middleware/saveJsonFile";

const rootReducer = combineReducers({
  setting: setting,
});

const migration = (state: unknown): State => {
  // add code when migration is needed
  return {
    ...defaultState,
  };
};

const loadState = (): State | undefined => {
  const dataPath = getSavePath();
  const parsedSetting = readJsonFile(dataPath);
  const ajv = new Ajv();
  const validate = ajv.compile(settingSchema);
  const valid = validate(parsedSetting);
  if (!valid) {
    console.log(validate.errors);

    return migration(parsedSetting);
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToJsonFile),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
