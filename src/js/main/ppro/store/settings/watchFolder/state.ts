import { JSONSchemaType } from "ajv";

export type WatchFolderState = {
  isWatchingOnStartup: boolean;
  path: string;
};

export const watchFolderDefaultState: WatchFolderState = {
  isWatchingOnStartup: false,
  path: "",
};

export const watchFolderSchema: JSONSchemaType<WatchFolderState> = {
  type: "object",
  properties: {
    isWatchingOnStartup: { type: "boolean" },
    path: { type: "string" },
  },
  required: ["isWatchingOnStartup", "path"],
  additionalProperties: false,
};
