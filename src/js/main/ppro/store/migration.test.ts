import { test, expect } from "vitest";
import { migration, isSimpleSettingState } from "./migration";
import { defaultState } from "./state";
import { defaultCharacter } from "./settings/characters/state";

test("migration returns default state when input is not a SimpleSettingState", () => {
  const input = "not a SimpleSettingState";
  const result = migration(input);
  expect(result).toEqual(defaultState);
});

test("isSimpleSettingState returns false when input is not a SimpleSettingState", () => {
  const input = "not a SimpleSettingState";
  const result = isSimpleSettingState(input);
  expect(result).toBe(false);
});

test("isSimpleSettingState returns true when input is a SimpleSettingState", () => {
  const input = {
    version: 1,
    characters: {},
    feature: {},
    selectedCharacter: "character1",
    watchFolder: {},
  };
  const result = isSimpleSettingState(input);
  expect(result).toBe(true);
});

test("migration merges default state with input state", () => {
  const input = {
    version: 1,
    characters: { character1: { name: "Character 1" } },
    feature: { feature1: true },
    selectedCharacter: "character1",
    watchFolder: { path: "/path/to/watch" },
  };
  const expected = {
    ...defaultState,
    setting: {
      ...input,
      characters: {
        character1: {
          ...defaultCharacter,
          ...input.characters.character1,
        },
      },
      feature: { ...defaultState.setting.feature, ...input.feature },
      watchFolder: {
        ...defaultState.setting.watchFolder,
        ...input.watchFolder,
      },
    },
  };
  const result = migration(input);
  expect(result).toEqual(expected);
});
