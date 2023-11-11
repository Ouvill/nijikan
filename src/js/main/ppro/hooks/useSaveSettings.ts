import { useAppSelector } from "./useReduxHooks";
import { saveSettingsToLocalStorage } from "../libs/saveSettingsToLocalStorage";

export const useSaveSettings = () => {
  const setting = useAppSelector((state) => state.setting);
  return () => saveSettingsToLocalStorage(setting);
};
