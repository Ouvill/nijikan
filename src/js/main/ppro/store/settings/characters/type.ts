import type { JSONSchemaType } from "ajv";

export type Character = {
  id: string;
  name: string;
  subtitleMogrtPath: string;
  subtitleTrackIndex: number;
  subtitleParamName: string;
  imagePath: string;
  imagePosition: {
    x: number;
    y: number;
  };
  imageScale: number;
  imageHorizontalFlip: boolean;
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
    imagePath: { type: "string" },
    imagePosition: {
      type: "object",
      properties: {
        x: { type: "number" },
        y: { type: "number" },
      },
      required: ["x", "y"],
    },
    imageScale: { type: "number" },
    imageHorizontalFlip: { type: "boolean" },
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
    "imagePath",
    "imagePosition",
    "imageScale",
    "imageHorizontalFlip",
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
