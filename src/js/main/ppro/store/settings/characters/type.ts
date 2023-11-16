import type { JSONSchemaType } from "ajv";

export type Character = {
  id: string;
  name: string;
  subtitleMogrtPath: string;
  subtitleTrackIndex: number;
  subtitleParamName: string;
  imagePosition: {
    x: number;
    y: number;
  };
  imageScale: number;
  imagePath: string;
  imageVidTrackIndex: number;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};

export const characterSchema: JSONSchemaType<Character> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    subtitleMogrtPath: { type: "string" },
    subtitleTrackIndex: { type: "number" },
    subtitleParamName: { type: "string" },
    imagePosition: {
      type: "object",
      properties: {
        x: { type: "number" },
        y: { type: "number" },
      },
      required: ["x", "y"],
    },
    imageScale: { type: "number" },
    imagePath: { type: "string" },
    imageVidTrackIndex: { type: "number" },
    lipSyncMogrtPath: { type: "string" },
    lipSyncVidTrackIndex: { type: "number" },
    voiceTrackIndex: { type: "number" },
  },
  required: [
    "id",
    "name",
    "subtitleMogrtPath",
    "subtitleTrackIndex",
    "subtitleParamName",
    "imagePosition",
    "imageScale",
    "imagePath",
    "imageVidTrackIndex",
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
