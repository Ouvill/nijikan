import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const localStorageKey = "watchFolder";

export type WatchFolder = {
  isWatchingOnStartup: boolean;
  path: string;
};

export const watchFolderDefaultState: WatchFolder = {
  isWatchingOnStartup: false,
  path: "",
};

export const loadWatchFolderFromLocalStorage = () => {
  const watchFolder = localStorage.getItem(localStorageKey);
  if (watchFolder) {
    return JSON.parse(watchFolder) as WatchFolder;
  }
  return;
};

export const saveWatchFolderToLocalStorage = (watchFolder: WatchFolder) => {
  localStorage.setItem(localStorageKey, JSON.stringify(watchFolder));
};

type SaveFunc = (state: WatchFolder) => void;

const slice = createSlice({
  name: "watchFolder",
  initialState: watchFolderDefaultState,
  reducers: {
    setWatchFolder: (
      state,
      action: PayloadAction<{
        path: string;
        saveFunc: SaveFunc;
      }>,
    ) => {
      const { saveFunc, path } = action.payload;
      state.path = path;
      saveFunc(state);
    },
    setIsWatchingOnStartup: (
      state,
      action: PayloadAction<{
        isWatchingOnStartup: boolean;
        saveFunc: SaveFunc;
      }>,
    ) => {
      const { saveFunc, isWatchingOnStartup } = action.payload;
      state.isWatchingOnStartup = isWatchingOnStartup;
      saveFunc(state);
    },
  },
});

export const createWatchFolderInitialState = (
  initialState: WatchFolder,
): WatchFolder => {
  return loadWatchFolderFromLocalStorage() || initialState;
};

export const watchFolderReducer = slice.reducer;
export const watchFolderActions = slice.actions;
