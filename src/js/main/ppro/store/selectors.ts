import { RootState } from "./index";

export const watchFolderSelector = (state: RootState) =>
  state.setting.watchFolder;

export const selectedCharacterSelector = (state: RootState) =>
  state.setting.selectedCharacter;

export const characterCollectionSelector = (state: RootState) =>
  state.setting.characters;

export const featureSelector = (state: RootState) => state.setting.feature;

export const settingSelector = (state: RootState) => state.setting;
