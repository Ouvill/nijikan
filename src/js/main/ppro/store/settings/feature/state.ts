import { JSONSchemaType } from "ajv";

export type FeatureState = {
  overwriteTrack: boolean;
  insertVoice: boolean;
  insertSubtitle: boolean;
  insertLipSync: boolean;
};

export const featureDefaultState: FeatureState = {
  overwriteTrack: false,
  insertVoice: true,
  insertSubtitle: true,
  insertLipSync: true,
};

export const featureSchema: JSONSchemaType<FeatureState> = {
  type: "object",
  properties: {
    overwriteTrack: { type: "boolean" },
    insertVoice: { type: "boolean" },
    insertSubtitle: { type: "boolean" },
    insertLipSync: { type: "boolean" },
  },
  required: [
    "overwriteTrack",
    "insertVoice",
    "insertSubtitle",
    "insertLipSync",
  ],
  additionalProperties: false,
};
