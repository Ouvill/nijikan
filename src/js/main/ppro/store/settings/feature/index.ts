import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultState } from "./state";

const feature = createSlice({
  name: "setting/enable",
  initialState: defaultState,
  reducers: {
    setOverwriteTrack: (state, action: PayloadAction<boolean>) => {
      state.overwriteTrack = action.payload;
    },
  },
});

export const { setOverwriteTrack } = feature.actions;
export default feature.reducer;
