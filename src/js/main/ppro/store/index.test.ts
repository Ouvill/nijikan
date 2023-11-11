import { store } from "./index";
import { expect, test } from "vitest";
import { defaultState } from "./state";

test("store has expected initial state", () => {
  const state = store.getState();
  expect(state).toEqual(defaultState);
});
