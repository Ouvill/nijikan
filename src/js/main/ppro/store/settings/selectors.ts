import { RootState } from "../index";

export const watchFolderSelector = (state: RootState) =>
  state.setting.watchFolder;
