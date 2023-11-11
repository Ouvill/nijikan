import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { featureDefaultState } from "./state";

const feature = createSlice({
  name: "setting/feature",
  initialState: featureDefaultState,
  reducers: {
    setOverwriteTrack: (state, action: PayloadAction<boolean>) => {
      state.overwriteTrack = action.payload;
    },
  },
});

export const { setOverwriteTrack } = feature.actions;
export default feature.reducer;
