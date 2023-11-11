import { settingDefaultState, SettingState } from "./settings";

export type State = {
  setting: SettingState;
};

export const defaultState: State = {
  setting: settingDefaultState,
};
