/**
 * Converts track item index to QE index.
 * @param track The track to convert.
 */
export function convertTrackItemIndexToQeIndex(track: Track) {
  const clips = track.clips;
  let leftTime = new Time();
  let qeIndex = 0;
  const result: number[] = [];
  for (let i = 0; i < clips.numItems; i++) {
    const clip = clips[i];
    if (clip.start.seconds === leftTime.seconds) {
      result.push(qeIndex);
      qeIndex++;
    } else {
      qeIndex++;
      result.push(qeIndex);
      qeIndex++;
    }
    leftTime = clip.end;
  }
  return result;
}
