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
