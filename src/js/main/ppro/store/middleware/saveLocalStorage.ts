import { Middleware } from "redux";

import {saveSettingsToLocalStorage} from "../../libs/saveSettingsToLocalStorage";

export const saveLocalStorage: Middleware = (store) => (next) => (action) => {
  if (action.type.includes("setting/")) {
    const result = next(action);
    try {
      const state = store.getState();
      saveSettingsToLocalStorage(state.setting);
      return result;
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return result;
    }
  }
};
