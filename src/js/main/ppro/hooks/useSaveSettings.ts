import { useAppSelector } from "./useReduxHooks";
import { SettingState } from "../store/settings";

const saveSettingsToLocalStorage = (setting: SettingState) => {
  localStorage.setItem("setting", JSON.stringify(setting));
};

export const useSaveSettings = () => {
  const setting = useAppSelector((state) => state.setting);
  return () => saveSettingsToLocalStorage(setting);
};
