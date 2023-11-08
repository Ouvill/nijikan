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
  if (compareTime(targetTime, track.clips[track.clips.numItems - 1].end) > 0) {
    return true;
  }

  // if targetTime is before first clip
  const zeroTime = new Time();
  zeroTime.seconds = 0;
  if (isBetweenTime(targetTime, zeroTime, track.clips[0].start)) {
    const targetEndTime = addTime(targetTime, duration);
    return compareTime(targetEndTime, track.clips[0].start) < 0;
  }

  for (let i = 0; i < track.clips.numItems - 1; i++) {
    // targetTime on clip
    if (isClipOnTime(targetTime, track.clips[i])) {
      return false;
    } else if (
      //   targetTime between clip and next clip
      isBetweenTime(targetTime, track.clips[i].end, track.clips[i + 1].start)
    ) {
      // if duration is longer than between clip and next clip
      const targetEndTime = addTime(targetTime, duration);
      return compareTime(targetEndTime, track.clips[i + 1].start) < 0;
    }
  }
};