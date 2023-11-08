// Please do not write comments in Japanese.
// I don't know why, but it stops working.
import {addTime, fillMogrtText, findItemByPath, forEachClip,} from "./ppro-utils";
import {findOrCreateBin} from "./scripts/findOrCreateBin";
import {getProjectItemDuration} from "./scripts/getProjectItemDuration";

export { selectFolder } from "./scripts/selectFolder";
export { checkBeforeInsert } from "./scripts/checkBeforeInsert";
export const example = () => {};

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

const checkInsertable = (targetTime: Time, duration: Time, track: Track) => {
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

const importAudio = (bin: ProjectItem, path: string) => {
  const importOk = app.project.importFiles([path], true, bin, false);
  if (!importOk) return;
  return findItemByPath(bin, path);
};

const findClipByPath = (track: Track, path: string) => {
  const num = track.clips.numItems;
  for (let i = 0; i < num; i++) {
    const clip = track.clips[i];
    const clipPath = clip.projectItem.getMediaPath();
    if (clipPath === path) {
      return clip;
    }
  }
};

export const insertAudio = (
  audioItem: ProjectItem,
  targetTime: Time,
  trackIndex: number,
) => {
  const track = app.project.activeSequence.audioTracks[trackIndex];
  const result = track.insertClip(
    audioItem,
    // @ts-ignore
    targetTime.ticks,
  );

  if (result) {
    return findClipByPath(track, audioItem.getMediaPath());
  }
};

export const insertCharacterTrackItems = (path: string, trackIndex: number) => {
  alert("insertCharacterTrackItems");
  const playerPosition = app.project.activeSequence.getPlayerPosition();
  const targetBin = findOrCreateBin("voice");

  const audioItem = importAudio(targetBin, path);
  if (!audioItem) return;

  const duration = getProjectItemDuration(audioItem);
  if (!duration) return;

  if (
    checkInsertable(
      playerPosition,
      duration,
      app.project.activeSequence.audioTracks[trackIndex],
    )
  ) {
    insertAudio(audioItem, playerPosition, trackIndex);
  } else {
    alert("cannot insert");
  }
};

export const importMogrt = (path: string) => {
  const playerPosition = app.project.activeSequence.getPlayerPosition();
  const clip = app.project.activeSequence.importMGT(
    path,
    playerPosition.ticks,
    1,
    0,
  );

  app.project.activeSequence.setPlayerPosition(clip.end.ticks);

  fillMogrtText(clip, "data", "Hello World");
};

export const moveClip = (targetSec: number) => {
  const clip = app.project.activeSequence.getSelection()[0];
  const t = new Time();
  t.seconds = targetSec;
  const eTime = new Time();
  eTime.seconds = targetSec + 10;
  // @ts-ignore
  clip.move(t.seconds);
};

export const alertTracks = () => {
  const clips = app.project.activeSequence.videoTracks[0].clips;
  alert(clips.numItems.toString());
  const num = clips.numItems;
  const nums: string[] = [];
  for (let i = 0; i < num; i++) {
    nums.push(clips[i].name);
  }
  alert(nums.join(","));
};

export const selectMogrtFile = () => {
  const filterString = Folder.fs === "Windows" ? "mogrt:*.mogrt" : "";
  const file = File.openDialog("select mogrt file", filterString, false);

  if (file) {
    return file.fsName;
  }
  return "";
};

export const getAudioMediaPathAtTargetTrack = (trackIndex: number) => {
  const clips = app.project.activeSequence.audioTracks[trackIndex].clips;
  const num = clips.numItems;
  const paths: string[] = [];
  for (let i = 0; i < num; i++) {
    const clip = clips[i];
    const path = clip.projectItem.getMediaPath();
    if (path) {
      paths.push(path);
    }
  }
  return paths;
};

export const insertLabMogrt = (
  mogrtPath: string,
  insertTrackIndex: number,
  audioTrackIndex: number,
) => {
  // @ts-ignore
  if (app.project.activeSequence == 0) return;
  if (app.project.activeSequence.audioTracks.numTracks <= audioTrackIndex)
    return;

  const track = app.project.activeSequence.audioTracks[audioTrackIndex];
  forEachClip(track, (clip) => {
    const mediaPath = clip.projectItem.getMediaPath();
    if (!mediaPath) return;

    const audioFile = new File(mediaPath);
    const baseName = audioFile.fsName.slice(
      0,
      audioFile.fsName.lastIndexOf("."),
    );
    const labFile = new File(baseName + ".lab");

    const isOpen = labFile.open("r", "TEXT", "????");
    if (isOpen) {
      const labData = labFile.read();

      const mogrt = app.project.activeSequence.importMGT(
        mogrtPath,
        clip.start.ticks,
        insertTrackIndex,
        insertTrackIndex,
      );
      mogrt.end = clip.end;
      clip.name = "";

      fillMogrtText(mogrt, "lab", labData);
    }
  });
};
