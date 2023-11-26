import { JsxError } from "./results";

export const JsxErrors: { [key: string]: JsxError } = {
  ImportFileError: {
    name: "ImportFileError",
    message: "Import file error",
  },

  GetDurationError: {
    name: "GetDurationError",
    message: "Get duration error",
  },

  InsertError: {
    name: "InsertError",
    message: "Insert error",
  },

  ImportMogrtError: {
    name: "ImportMogrtError",
    message: "Import mogrt error",
  },

  ApplyEffectError: {
    name: "ApplyEffectError",
    message: "Apply effect error",
  },
} as const;
