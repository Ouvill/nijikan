import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSONSchemaType } from "ajv";

export type SelectedCharacterState = string;

export const selectedCharacterDefaultState: SelectedCharacterState = "shikokuMetan";

const selectedCharacter = createSlice({
  name: "setting/selectedCharacter",
  initialState: selectedCharacterDefaultState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const selectedCharacterReducer = selectedCharacter.reducer;
export const selectedCharacterActions = selectedCharacter.actions;

export const selectedCharacterSchema: JSONSchemaType<SelectedCharacterState> = {
  type: "string",
};
