import { JSONSchemaType } from "ajv";

export type FeatureState = {
  overwriteTrack: boolean;
  insertVoice: boolean;
  insertSubtitle: boolean;
  insertImage: boolean;
  insertLipSync: boolean;
  linkSubtitleClip: boolean;
};

export const featureDefaultState: FeatureState = {
  overwriteTrack: false,
  insertVoice: true,
  insertSubtitle: true,
  insertImage: true,
  insertLipSync: true,
  linkSubtitleClip: true,
};

export const featureSchema: JSONSchemaType<FeatureState> = {
  type: "object",
  properties: {
    overwriteTrack: { type: "boolean" },
    insertVoice: { type: "boolean" },
    insertSubtitle: { type: "boolean" },
    insertImage: { type: "boolean" },
    insertLipSync: { type: "boolean" },
    linkSubtitleClip: { type: "boolean" },
  },
  required: [
    "overwriteTrack",
    "insertVoice",
    "insertSubtitle",
    "insertLipSync",
    "linkSubtitleClip",
  ],
  additionalProperties: false,
};
