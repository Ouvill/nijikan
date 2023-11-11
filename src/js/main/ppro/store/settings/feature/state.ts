export type Feature = {
  overwriteTrack: boolean;
  insertVoice: boolean;
  insertSubtitle: boolean;
  insertLipSync: boolean;
};

export const defaultState: Feature = {
  overwriteTrack: false,
  insertVoice: true,
  insertSubtitle: true,
  insertLipSync: true,
};
