import { addTime } from "../ppro-utils";

const compareTime = (a: Time, b: Time) => {
  const aTicks = parseInt(a.ticks);
  const bTicks = parseInt(b.ticks);
  if (aTicks > bTicks) {
    return 1;
  } else if (aTicks < bTicks) {
    return -1;
  }
  return 0;
};
const isBetweenTime = (targetTime: Time, start: Time, end: Time) => {
  return (
    compareTime(targetTime, start) >= 0 && compareTime(targetTime, end) < 0
  );
};
const isClipOnTime = (targetTime: Time, clip: TrackItem) => {
  return isBetweenTime(targetTime, clip.start, clip.end);
};

/**
 * Checks if a clip can be inserted at the specified target time on the given track.
 * @param targetTime The target time to check for insertable.
 * @param duration The duration of the clip to be inserted.
 * @param track The track to check for insertable.
 * @returns The index of the clip that the new clip should be inserted before, or -1 if it cannot be inserted.
 */
export const checkInsertable = (
  targetTime: Time,
  duration: Time,
  track: Track,
): number => {
  const targetEndTime = addTime(targetTime, duration);

  // if track is empty
  if (track.clips.numItems === 0) {
    return 0;
  }

  // if targetTime is after last clip
  if (compareTime(targetTime, track.clips[track.clips.numItems - 1].end) >= 0) {
    return track.clips.numItems;
  }

  // if targetTime is before first clip
  const zeroTime = new Time();
  zeroTime.seconds = 0;
  if (isBetweenTime(targetTime, zeroTime, track.clips[0].start)) {
    if (compareTime(targetEndTime, track.clips[0].start) < 0) {
      return 0;
    }
    return -1;
  }

  // binary search
  let left = 0;
  let right = track.clips.numItems - 1;
  let middle: number;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);

    if (compareTime(targetTime, track.clips[middle].start) < 0) {
      right = middle - 1;
    } else if (compareTime(targetTime, track.clips[middle].end) >= 0) {
      left = middle + 1;
      if (compareTime(targetEndTime, track.clips[middle + 1].start) <= 0) {
        return middle;
      }
    } else /* targetTime on clip */ {
      return -1;
    }
  }
  return -1;
};
