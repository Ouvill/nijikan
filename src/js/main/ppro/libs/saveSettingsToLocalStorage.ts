import { SettingState } from "../store/settings";
import { STORE } from "../store/constant";

export const saveSettingsToLocalStorage = (setting: SettingState) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORE.SETTING_KEY, JSON.stringify(setting));
};
