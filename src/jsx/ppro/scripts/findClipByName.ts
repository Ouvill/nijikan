export const findClipByName = (track: Track, name: string) => {
  const num = track.clips.numItems;
  for (let i = 0; i < num; i++) {
    const clip = track.clips[i];

    if (clip.name === name) {
      return clip;
    }
  }
  return undefined;
};
