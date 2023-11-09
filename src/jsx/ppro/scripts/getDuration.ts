import { parseTime } from "./parseTime";
import { findClipByPath } from "./findClipByPath";
import { getTrackEndTime } from "./getTrackEndTime";

// There is a discrepancy between the duration that can be obtained from MediaDuration and the duration when inserted into the track.
export const getProjectItemDurationByMetadata = (item: ProjectItem) => {
  const meta = item.getProjectMetadata();
  const regex =
    /<premierePrivateProjectMetaData:Column.Intrinsic.MediaDuration>(.*)<\/premierePrivateProjectMetaData:Column.Intrinsic.MediaDuration>/;
  const res = regex.exec(meta);
  if (!res) return;

  // duration format: hh:mm:ss:fffff
  const duration = res[1];
  return parseTime(duration);
};

export const getAudioDuration = (item: ProjectItem) => {
  const seq = app.project.activeSequence;
  const track = seq.audioTracks[0];

  const endTime = getTrackEndTime(track);

  // @ts-ignore
  const result = track.insertClip(item, endTime.ticks);
  if (result) {
    const tmpItem = findClipByPath(track, item.getMediaPath(), true);
    if (!tmpItem) return;
    const duration = tmpItem.duration;
    tmpItem.remove(false, false);
    return duration;
  }
};
