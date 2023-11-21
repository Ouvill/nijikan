import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { featureDefaultState } from "./state";

const feature = createSlice({
  name: "setting/feature",
  initialState: featureDefaultState,
  reducers: {
    setMovePlayerPosition: (state, action: PayloadAction<boolean>) => {
      state.movePlayerPosition = action.payload;
    },
    setOverwriteTrack: (state, action: PayloadAction<boolean>) => {
      state.overwriteTrack = action.payload;
    },
    setLinkSubtitleClip(state, action: PayloadAction<boolean>) {
      state.linkSubtitleClip = action.payload;
    },
    setInsertImage(state, action: PayloadAction<boolean>) {
      state.insertImage = action.payload;
    },
    setLinkImageClip(state, action: PayloadAction<boolean>) {
      state.linkImageClip = action.payload;
    },
    setInsertLipSync(state, action: PayloadAction<boolean>) {
      state.insertLipSync = action.payload;
    },
    setLinkLipSyncClip(state, action: PayloadAction<boolean>) {
      state.linkLipSyncClip = action.payload;
    },
  },
});

export const featureActions = feature.actions;
export default feature.reducer;
