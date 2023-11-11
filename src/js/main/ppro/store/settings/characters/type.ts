import type { JSONSchemaType } from "ajv";

export type Character = {
  id: string;
  name: string;
  subtitleMogrtPaths: string[];
  subtitleTrackIndex: number;
  subtitleParamName: string;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};

export const characterSchema: JSONSchemaType<Character> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    subtitleMogrtPaths: { type: "array", items: { type: "string" } },
    subtitleTrackIndex: { type: "number" },
    subtitleParamName: { type: "string" },
    lipSyncMogrtPath: { type: "string" },
    lipSyncVidTrackIndex: { type: "number" },
    voiceTrackIndex: { type: "number" },
  },
  required: [
    "id",
    "name",
    "subtitleMogrtPaths",
    "subtitleTrackIndex",
    "subtitleParamName",
    "lipSyncMogrtPath",
    "lipSyncVidTrackIndex",
    "voiceTrackIndex",
  ],
  additionalProperties: false,
};

export type Characters = { [name: string]: Character };

export const charactersSchema: JSONSchemaType<Characters> = {
  type: "object",
  patternProperties: {
    ".*": characterSchema,
  },
  additionalProperties: false,
  required: [],
};
