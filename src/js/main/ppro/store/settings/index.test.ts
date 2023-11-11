import { expect, test } from "vitest";
import Ajv from "ajv";
import { settingDefaultState, settingSchema } from "./index";

test("defaultState is valid according to settingSchema", () => {
  const ajv = new Ajv();
  const validate = ajv.compile(settingSchema);
  const valid = validate(settingDefaultState);
  expect(valid).toBe(true);
});
