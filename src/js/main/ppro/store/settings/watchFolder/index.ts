import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { watchFolderDefaultState, WatchFolderState } from "./state";

const localStorageKey = "watchFolder";

export const loadWatchFolderFromLocalStorage = () => {
  const watchFolder = localStorage.getItem(localStorageKey);
  if (watchFolder) {
    return JSON.parse(watchFolder) as WatchFolderState;
  }
  return;
};

export const saveWatchFolderToLocalStorage = (
  watchFolder: WatchFolderState,
) => {
  localStorage.setItem(localStorageKey, JSON.stringify(watchFolder));
};

type SaveFunc = (state: WatchFolderState) => void;

const watchFolder = createSlice({
  name: "setting/watchFolder",
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
  initialState: WatchFolderState,
): WatchFolderState => {
  return loadWatchFolderFromLocalStorage() || initialState;
};

export const watchFolderActions = watchFolder.actions;

export default watchFolder.reducer;
