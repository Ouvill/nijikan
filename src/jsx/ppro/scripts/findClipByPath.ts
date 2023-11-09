export const findClipByPath = (
  track: Track,
  path: string,
  reverse?: boolean,
) => {
  const num = track.clips.numItems;
  if (reverse) {
    for (let i = num - 1; i > -1; i--) {
      const clip = track.clips[i];
      const clipPath = clip.projectItem.getMediaPath();
      if (clipPath === path) {
        return clip;
      }
    }
  } else {
    for (let i = 0; i < num; i++) {
      const clip = track.clips[i];
      const clipPath = clip.projectItem.getMediaPath();
      if (clipPath === path) {
        return clip;
      }
    }
  }
};
