import { JSONSchemaType } from "ajv";

export type WatchFolderState = {
  isWatchingOnStartup: boolean;
  isWatching: boolean;
  path: string;
};

export const watchFolderDefaultState: WatchFolderState = {
  isWatchingOnStartup: false,
  isWatching: false,
  path: "",
};

export const watchFolderSchema: JSONSchemaType<WatchFolderState> = {
  type: "object",
  properties: {
    isWatchingOnStartup: { type: "boolean" },
    isWatching: { type: "boolean" },
    path: { type: "string" },
  },
  required: ["isWatchingOnStartup", "isWatching", "path"],
  additionalProperties: false,
};
