import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import featureReducer from "./feature";

const setting = combineReducers({
  feature: featureReducer,
});
