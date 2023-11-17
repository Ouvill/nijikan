import { Middleware } from "redux";
import { getSavePath, saveDataToJsonFile } from "../../libs/saveSettingsToJson";
import { RootState } from "../index";
import { settingSelector } from "../selectors";

export const saveToJsonFile: Middleware = (store) => (next) => (action) => {
  if (action.type.includes("setting/")) {
    const result = next(action);
    try {
      const state: RootState = store.getState();
      const setting = settingSelector(state);
      const filePath = getSavePath();
      saveDataToJsonFile(setting, filePath);

      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return result;
    }
  }
};
