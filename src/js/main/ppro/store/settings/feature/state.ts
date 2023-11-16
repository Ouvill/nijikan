import { JSONSchemaType } from "ajv";

export type FeatureState = {
  overwriteTrack: boolean;
  insertVoice: boolean;
  insertSubtitle: boolean;
  insertImage: boolean;
  insertLipSync: boolean;
  linkClips: boolean;
};

export const featureDefaultState: FeatureState = {
  overwriteTrack: false,
  insertVoice: true,
  insertSubtitle: true,
  insertImage: true,
  insertLipSync: true,
  linkClips: true,
};

export const featureSchema: JSONSchemaType<FeatureState> = {
  type: "object",
  properties: {
    overwriteTrack: { type: "boolean" },
    insertVoice: { type: "boolean" },
    insertSubtitle: { type: "boolean" },
    insertImage: { type: "boolean" },
    insertLipSync: { type: "boolean" },
    linkClips: { type: "boolean" },
  },
  required: [
    "overwriteTrack",
    "insertVoice",
    "insertSubtitle",
    "insertLipSync",
    "linkClips",
  ],
  additionalProperties: false,
};
