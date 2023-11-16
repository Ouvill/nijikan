import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { featureDefaultState } from "./state";

const feature = createSlice({
  name: "setting/feature",
  initialState: featureDefaultState,
  reducers: {
    setOverwriteTrack: (state, action: PayloadAction<boolean>) => {
      state.overwriteTrack = action.payload;
    },
    setInsertLipSync(state, action: PayloadAction<boolean>) {
      state.insertLipSync = action.payload;
    },
    setLinkClips(state, action: PayloadAction<boolean>) {
      state.linkClips = action.payload;
    },
    setInsertImage(state, action: PayloadAction<boolean>) {
      state.insertImage = action.payload;
    },
  },
});

export const featureActions = feature.actions;
export default feature.reducer;
