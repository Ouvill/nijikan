import { configureStore } from "@reduxjs/toolkit";
import { Character } from "./characters/type";

export type Store = {
  setting: {
    enable: {};
    characters: {
      [name: string]: Character;
    };
  };
};

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
