import { expect, test } from "vitest";
import { replaceExt } from "./index";

test("changes the extension of a file path", () => {
  expect(replaceExt("/path/to/file.txt", ".jpg")).toBe("/path/to/file.jpg");
  expect(replaceExt("/path/to/another/file.jpg", ".png")).toBe(
    "/path/to/another/file.png",
  );
  expect(replaceExt("/path/to/a/directory/", ".txt")).toBe(
    "/path/to/a/directory/",
  );
  expect(replaceExt("file.txt", ".png")).toBe("file.png");
  // windows drive path
  expect(replaceExt("C:\\path\\to\\file.txt", ".jpg")).toBe(
    "C:\\path\\to\\file.jpg",
  );
  expect(replaceExt("", ".txt")).toBe("");
});
