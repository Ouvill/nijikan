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

export const checkInsertable = (
  targetTime: Time,
  duration: Time,
  track: Track,
) => {
  // if track is empty
  if (track.clips.numItems === 0) {
    return true;
  }

  // if targetTime is after last clip
  if (compareTime(targetTime, track.clips[track.clips.numItems - 1].end) >= 0) {
    return true;
  }

  // if targetTime is before first clip
  const zeroTime = new Time();
  zeroTime.seconds = 0;
  if (isBetweenTime(targetTime, zeroTime, track.clips[0].start)) {
    const targetEndTime = addTime(targetTime, duration);
    return compareTime(targetEndTime, track.clips[0].start) < 0;
  }

  // binary search
  let left = 0;
  let right = track.clips.numItems - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (compareTime(targetTime, track.clips[middle].start) < 0) {
      right = middle - 1;
    } else if (compareTime(targetTime, track.clips[middle].end) >= 0) {
      left = middle + 1;
      if (
        compareTime(
          addTime(targetTime, duration),
          track.clips[middle + 1].start,
        ) < 0
      ) {
        return true;
      }
    } else {
      return false;
    }
  }
  return false;
};
