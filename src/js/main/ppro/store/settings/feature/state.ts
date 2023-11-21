import { JSONSchemaType } from "ajv";

export type FeatureState = {
  overwriteTrack: boolean;
  insertVoice: boolean;
  insertSubtitle: boolean;
  insertImage: boolean;
  insertLipSync: boolean;
  linkSubtitleClip: boolean;
  linkImageClip: boolean;
  linkLipSyncClip: boolean;
};

export const featureDefaultState: FeatureState = {
  overwriteTrack: false,
  insertVoice: true,
  insertSubtitle: true,
  insertImage: true,
  insertLipSync: true,
  linkSubtitleClip: true,
  linkImageClip: false,
  linkLipSyncClip: false,
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
    linkImageClip: { type: "boolean" },
    linkLipSyncClip: { type: "boolean" },
  },
  required: [
    "overwriteTrack",
    "insertVoice",
    "insertSubtitle",
    "insertLipSync",
    "linkSubtitleClip",
    "linkImageClip",
    "linkLipSyncClip",
  ],
  additionalProperties: false,
};
