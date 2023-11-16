// Please do not write comments in Japanese.
// I don't know why, but it stops working.
import { fillMogrtText, findItemByPath, forEachClip } from "./ppro-utils";
import { findOrCreateBin } from "./scripts/findOrCreateBin";
import { getAudioDuration } from "./scripts/getDuration";
import { checkInsertable } from "./scripts/checkInsertable";
import { linkClips } from "./scripts/linkClips";
import { findClipByStartTime } from "./scripts/findClipByStartTime";
import type { Character } from "../../js/main/ppro/store/settings/characters/type";
import type { FeatureState } from "../../js/main/ppro/store/settings/feature/state";
import { setClipMotionValue } from "./scripts/setClipMotionValue";
import { ns } from "../../shared/shared";
import { getMogrtProjectItem, mogrtStore } from "./scripts/mogrt";

export { selectFolder } from "./scripts/selectFolder";
export { checkBeforeInsert } from "./scripts/checkBeforeInsert";
export const example = () => {};

export const sandboxFunc = () => {};

const importFile = (bin: ProjectItem, path: string) => {
  const importOk = app.project.importFiles([path], true, bin, false);
  if (!importOk) return;
  return findItemByPath(bin, path);
};

const overwriteAudioClip = (
  audioItem: ProjectItem,
  targetTime: Time,
  trackIndex: number,
) => {
  const track = app.project.activeSequence.audioTracks[trackIndex];
  const result = track.overwriteClip(
    audioItem,
    // @ts-ignore
    targetTime.ticks,
  );

  if (result) {
    return findClipByStartTime(track, targetTime);
  }
};

const searchInsertableAudioTrack = (
  targetTime: Time,
  duration: Time,
  defaultIndex: number,
) => {
  const num = app.project.activeSequence.audioTracks.numTracks;
  for (let i = defaultIndex; i < num; i++) {
    const track = app.project.activeSequence.audioTracks[i];
    if (checkInsertable(targetTime, duration, track) !== -1) {
      return i;
    }
  }

  return -1;
};

const haveEnoughAudioTrack = (seq: Sequence, trackIndex: number) => {
  return seq.audioTracks.numTracks > trackIndex;
};

const haveEnoughVideoTrack = (seq: Sequence, trackIndex: number) => {
  return seq.videoTracks.numTracks > trackIndex;
};

const addAudioTrack = (numAudio: number, audioIndex: number) => {
  if (qe) {
    app.enableQE();
  }
  if (!qe) return;
  qe.project.getActiveSequence().addTracks(0, 0, numAudio, 1, audioIndex);
};

const addVideoTrack = (numVideo: number, videoIndex: number) => {
  if (qe) {
    app.enableQE();
  }
  if (!qe) return;
  qe.project.getActiveSequence().addTracks(numVideo, videoIndex, 0, 0, 0);
};

function overwriteVideoClip(
  videoItem: ProjectItem,
  duration: Time,
  targetTime: Time,
  trackIndex: number,
) {
  // @ts-ignore
  const originInPoint: Time = videoItem.getInPoint(1);
  // @ts-ignore
  const originOutPoint: Time = videoItem.getOutPoint(1);
  const zeroTime = new Time();
  zeroTime.seconds = 0;

  try {
    // set data
    // @ts-ignore
    videoItem.setInPoint(zeroTime.ticks, 4);
    // @ts-ignore
    videoItem.setOutPoint(duration.ticks, 4);

    // insert
    const track = app.project.activeSequence.videoTracks[trackIndex];
    // @ts-ignore
    const result = track.overwriteClip(videoItem, targetTime.ticks);
    if (!result) return;
    const clip = findClipByStartTime(track, targetTime);
    if (!clip) return;
    return clip;
  } finally {
    // restore data
    // @ts-ignore
    videoItem.setInPoint(originInPoint, 4);
    videoItem.setOutPoint(originOutPoint, 4);
  }
}

function insertAudioToSequence({
  overwriteTrack,
  targetTime,
  duration,
  audioItem,
  trackIndex,
}: {
  overwriteTrack?: boolean;
  targetTime: Time;
  duration: Time;
  audioItem: ProjectItem;
  trackIndex: number;
}) {
  const seq = app.project.activeSequence;

  // add audio track if needed
  if (!haveEnoughAudioTrack(seq, trackIndex)) {
    const numAudio = trackIndex - seq.audioTracks.numTracks + 1;
    addAudioTrack(numAudio, seq.audioTracks.numTracks);
  }

  if (overwriteTrack) {
    return overwriteAudioClip(audioItem, targetTime, trackIndex);
  } else {
    let targetIndex = searchInsertableAudioTrack(
      targetTime,
      duration,
      trackIndex,
    );
    if (targetIndex === -1) {
      targetIndex = seq.audioTracks.numTracks;
      addAudioTrack(1, targetIndex);
    }
    return overwriteAudioClip(audioItem, targetTime, targetIndex);
  }
}

function searchInsertableVideoTrack(
  targetTime: Time,
  duration: Time,
  defaultIndex: number,
): number {
  const num = app.project.activeSequence.videoTracks.numTracks;
  for (let i = defaultIndex; i < num; i++) {
    const track = app.project.activeSequence.videoTracks[i];
    if (checkInsertable(targetTime, duration, track) !== -1) {
      return i;
    }
  }

  return -1;
}

function insertVideoToSequence({
  overwriteTrack,
  targetTime,
  duration,
  videoItem,
  trackIndex,
}: {
  overwriteTrack?: boolean;
  targetTime: Time;
  duration: Time;
  videoItem: ProjectItem;
  trackIndex: number;
}) {
  const seq = app.project.activeSequence;

  // add audio track if needed
  if (!haveEnoughVideoTrack(seq, trackIndex)) {
    const numAudio = trackIndex - seq.videoTracks.numTracks + 1;
    addVideoTrack(numAudio, seq.videoTracks.numTracks);
  }

  if (overwriteTrack) {
    return overwriteVideoClip(videoItem, duration, targetTime, trackIndex);
  } else {
    let targetIndex = searchInsertableVideoTrack(
      targetTime,
      duration,
      trackIndex,
    );
    if (targetIndex === -1) {
      targetIndex = seq.audioTracks.numTracks;
      addVideoTrack(1, targetIndex);
    }
    return overwriteVideoClip(videoItem, duration, targetTime, targetIndex);
  }
}

export const insertCharacterTrackItems = ({
  voicePath,
  character,
  features,
  subtitle,
  lab,
}: {
  voicePath: string;
  character: Character;
  features: FeatureState;
  subtitle: string;
  lab: string;
}) => {
  const seq = app.project.activeSequence;
  const playerPosition = seq.getPlayerPosition();
  const targetBin = findOrCreateBin("voice");
  let clips: TrackItem[] = [];

  // audio
  const audioItem = importFile(targetBin, voicePath);
  if (!audioItem) return;

  const duration = getAudioDuration(audioItem);
  if (!duration) return;

  const audioClip = insertAudioToSequence({
    overwriteTrack: features.overwriteTrack,
    targetTime: playerPosition,
    audioItem,
    duration,
    trackIndex: character.voiceTrackIndex,
  });
  if (!audioClip) return;
  clips.push(audioClip);

  // subtitle
  let subtitleMogrtItem: ProjectItem;
  try {
    subtitleMogrtItem = getMogrtProjectItem(
      character.subtitleMogrtPath,
      mogrtStore,
    );
  } catch (e) {
    return;
  }

  const subtitleMogrtClip = insertVideoToSequence({
    overwriteTrack: features.overwriteTrack,
    targetTime: playerPosition,
    videoItem: subtitleMogrtItem,
    duration,
    trackIndex: character.subtitleTrackIndex,
  });
  if (!subtitleMogrtClip) return;
  fillMogrtText(subtitleMogrtClip, character.subtitleParamName, subtitle);
  clips.push(subtitleMogrtClip);

  // image
  if (features.insertImage && character.imagePath !== "") {
    const extensionBin = findOrCreateBin(ns.split(".").slice(-1)[0]);
    let image = findItemByPath(extensionBin, character.imagePath);
    if (image === undefined) {
      image = importFile(extensionBin, character.imagePath);
    }
    if (!image) return;

    const imageClip = insertVideoToSequence({
      overwriteTrack: features.overwriteTrack,
      targetTime: playerPosition,
      videoItem: image,
      duration,
      trackIndex: character.imageVidTrackIndex,
    });

    if (!imageClip) return;
    setClipMotionValue({
      seq: app.project.activeSequence,
      clip: imageClip,
      position: character.imagePosition,
      scale: character.imageScale,
    });
  }

  // lip sync
  if (features.insertLipSync && character.lipSyncMogrtPath) {
    let lipSyncMogrtItem: ProjectItem;
    try {
      lipSyncMogrtItem = getMogrtProjectItem(
        character.lipSyncMogrtPath,
        mogrtStore,
      );
    } catch (e) {
      return;
    }
    const lipSyncMogrtClip = insertVideoToSequence({
      overwriteTrack: features.overwriteTrack,
      targetTime: playerPosition,
      videoItem: lipSyncMogrtItem,
      duration,
      trackIndex: character.lipSyncVidTrackIndex,
    });
    if (!lipSyncMogrtClip) return;
    fillMogrtText(lipSyncMogrtClip, "lab", lab);

    setClipMotionValue({
      seq: app.project.activeSequence,
      clip: lipSyncMogrtClip,
      position: character.imagePosition,
      scale: character.imageScale,
    });
  }

  if (features.linkClips) {
    linkClips(clips, seq);
  }
  app.project.activeSequence.setPlayerPosition(audioClip.end.ticks);
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

export const selectFile = (prompt: string = "select file"): string => {
  const filterString = "";
  const file = File.openDialog(prompt, filterString, false);

  if (file) {
    return file.fsName;
  }
  return "";
};

export const selectMogrtFile = (): string => {
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
