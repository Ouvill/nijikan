import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { watchFolderDefaultState } from "./state";

const watchFolder = createSlice({
  name: "setting/watchFolder",
  initialState: watchFolderDefaultState,
  reducers: {
    setWatchFolder: (
      state,
      action: PayloadAction<{
        path: string;
      }>,
    ) => {
      const { path } = action.payload;
      state.path = path;
    },
    setIsWatchingOnStartup: (
      state,
      action: PayloadAction<{
        isWatchingOnStartup: boolean;
      }>,
    ) => {
      const { isWatchingOnStartup } = action.payload;
      state.isWatchingOnStartup = isWatchingOnStartup;
    },
  },
});

export const watchFolderActions = watchFolder.actions;

export default watchFolder.reducer;
