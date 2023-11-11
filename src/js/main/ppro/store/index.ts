import { combineReducers, configureStore } from "@reduxjs/toolkit";
import setting from "./settings";
import { defaultState, State } from "./state";

const rootReducer = combineReducers<State>({
  setting: setting,
});

export const store = configureStore({
  preloadedState: defaultState,
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
