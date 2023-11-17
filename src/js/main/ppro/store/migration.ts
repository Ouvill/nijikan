import { defaultState, State } from "./state";
import Ajv, { JSONSchemaType } from "ajv";
import { defaultCharacter } from "./settings/characters/state";
import { Characters } from "./settings/characters/type";

type SimpleSettingState = {
  version: number;
  characters: { [key: string]: object };
  feature: object;
  selectedCharacter: string;
  watchFolder: object;
};

const settingSchema: JSONSchemaType<SimpleSettingState> = {
  type: "object",
  properties: {
    version: { type: "number" },
    characters: {
      type: "object",
      patternProperties: {
        ".*": { type: "object" },
      },
      additionalProperties: true,
      required: [],
    },
    feature: { type: "object" },
    selectedCharacter: { type: "string" },
    watchFolder: { type: "object" },
  },
  required: ["version", "feature", "characters"],
  additionalProperties: false,
};

export function isSimpleSettingState(
  value: unknown,
): value is SimpleSettingState {
  const ajv = new Ajv();
  const validate = ajv.compile(settingSchema);
  return validate(value);
}

export const migration = (state: unknown): State => {
  if (!isSimpleSettingState(state)) return defaultState;
  const migratedCharacter: Characters = Object.entries(state.characters).reduce(
    (previousValue, [key, value]) => ({
      ...previousValue,
      [key]: {
        ...defaultCharacter,
        ...value,
      },
    }),
    {},
  );

  const migFeature = {
    ...defaultState.setting.feature,
    ...state.feature,
  };

  const migWatchFolder = {
    ...defaultState.setting.watchFolder,
    ...state.watchFolder,
  };

  return {
    ...defaultState,
    setting: {
      ...state,
      characters: migratedCharacter,
      feature: migFeature,
      watchFolder: migWatchFolder,
    },
  };
};
