import { getAssetsPath } from "./getAssetsPath";
import { describe, expect, test } from "vitest";

describe("getAssetsPath", () => {
  test("returns path to assets", async () => {
    const result = await getAssetsPath();
    expect(result).toBeUndefined();
  });
});
