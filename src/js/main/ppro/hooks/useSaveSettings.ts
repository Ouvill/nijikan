import { useAppSelector } from "./useReduxHooks";
import { SettingState } from "../store/settings";
import { STORE } from "../store/constant";

const saveSettingsToLocalStorage = (setting: SettingState) => {
  localStorage.setItem(STORE.SETTING_KEY, JSON.stringify(setting));
};

export const useSaveSettings = () => {
  const setting = useAppSelector((state) => state.setting);
  return () => saveSettingsToLocalStorage(setting);
};
