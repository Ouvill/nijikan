import type { JSONSchemaType } from "ajv";

export type Character = {
  id: string;
  name: string;
  regex: boolean;
  regexStr: string;
  enableSubtitle: boolean;
  subtitleMogrtPath: string;
  subtitleTrackIndex: number;
  subtitleParamName: string;
  enableImage: boolean;
  imagePath: string;
  imagePosition: {
    x: number;
    y: number;
  };
  imageScale: number;
  imageHorizontalFlip: boolean;
  imageVidTrackIndex: number;
  enableLipSync: boolean;
  lipSyncMogrtPath: string;
  lipSyncVidTrackIndex: number;
  voiceTrackIndex: number;
};

export const characterSchema: JSONSchemaType<Character> = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    regex: { type: "boolean" },
    regexStr: { type: "string" },
    enableSubtitle: { type: "boolean" },
    subtitleMogrtPath: { type: "string" },
    subtitleTrackIndex: { type: "number" },
    subtitleParamName: { type: "string" },
    enableImage: { type: "boolean" },
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
    enableLipSync: { type: "boolean" },
    lipSyncMogrtPath: { type: "string" },
    lipSyncVidTrackIndex: { type: "number" },
    voiceTrackIndex: { type: "number" },
  },
  required: [
    "id",
    "name",
    "regex",
    "regexStr",
    "enableSubtitle",
    "subtitleMogrtPath",
    "subtitleTrackIndex",
    "subtitleParamName",
    "enableImage",
    "imagePath",
    "imagePosition",
    "imageScale",
    "imageHorizontalFlip",
    "imageVidTrackIndex",
    "enableLipSync",
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
