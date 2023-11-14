import { compareTime } from "./compareTime";

export const findClipByStartTime = (track: Track, time: Time) => {
  const num = track.clips.numItems;

  let left = 0;
  let right = num - 1;
  let middle: number;

  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (compareTime(time, track.clips[middle].start) === 0) {
      return track.clips[middle];
    } else if (compareTime(time, track.clips[middle].start) > 0) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return undefined;
};
