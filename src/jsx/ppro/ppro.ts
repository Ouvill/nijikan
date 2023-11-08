// Please do not write comments in Japanese.
// I don't know why, but it stops working.
import { fillMogrtText, findItemByPath, forEachClip } from "./ppro-utils";
import { findOrCreateBin } from "./scripts/findOrCreateBin";
import { getProjectItemDuration } from "./scripts/getProjectItemDuration";
import { checkInsertable } from "./scripts/checkInsertable";
import { findClipByPath } from "./scripts/findClipByPath";
import type { Character } from "../../js/main/ppro/store/characters/type";

export { selectFolder } from "./scripts/selectFolder";
export { checkBeforeInsert } from "./scripts/checkBeforeInsert";
export const example = () => {};

const importAudio = (bin: ProjectItem, path: string) => {
  const importOk = app.project.importFiles([path], true, bin, false);
  if (!importOk) return;
  return findItemByPath(bin, path);
};

const insertAudioClip = (
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

const searchInsertableAudioTrack = (
  targetTime: Time,
  duration: Time,
  defaultIndex: number,
) => {
  const num = app.project.activeSequence.audioTracks.numTracks;
  for (let i = defaultIndex; i < num; i++) {
    const track = app.project.activeSequence.audioTracks[i];
    if (checkInsertable(targetTime, duration, track)) {
      return i;
    }
  }

  return -1;
};

const haveEnoughAudioTrack = (seq: Sequence, trackIndex: number) => {
  return seq.audioTracks.numTracks > trackIndex;
};

const addAudioTrack = (numAudio: number, audioIndex: number) => {
  if (qe) {
    app.enableQE();
  }
  if (!qe) return;
  qe.project.getActiveSequence().addTracks(0, 0, numAudio, 1, audioIndex);
};

export const testAddAudioTrack = () => {
  const trackIndex = 6;
  const seq = app.project.activeSequence;
  const numAudio = trackIndex - seq.audioTracks.numTracks + 1;
  addAudioTrack(numAudio, seq.audioTracks.numTracks);
};

function insertAudioClipIfPossible(
  audioItem: ProjectItem,
  duration: Time,
  playerPosition: Time,
  trackIndex: number,
) {
  if (
    checkInsertable(
      playerPosition,
      duration,
      app.project.activeSequence.audioTracks[trackIndex],
    )
  ) {
    return insertAudioClip(audioItem, playerPosition, trackIndex);
  } else {
    return undefined;
  }
}

function insertAudioToSequence({
  insertOtherTrack,
  targetTime,
  duration,
  audioItem,
  trackIndex,
}: {
  insertOtherTrack?: boolean;
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

  if (insertOtherTrack) {
    let targetIndex = searchInsertableAudioTrack(
      targetTime,
      duration,
      trackIndex,
    );
    if (targetIndex === -1) {
      targetIndex = seq.audioTracks.numTracks;
      addAudioTrack(1, targetIndex);
    }
    return insertAudioClipIfPossible(
      audioItem,
      duration,
      targetTime,
      targetIndex,
    );
  } else {
    return insertAudioClipIfPossible(
      audioItem,
      duration,
      targetTime,
      trackIndex,
    );
  }
}

/**
 * Inserts an audio track item for a character at the current player position in the active sequence.
 * @param path - The path to the audio file to import.
 * @param character - The character for which to insert the audio track item.
 * @param options - Optional settings for the insertion.
 * @returns void
 */
export const insertCharacterTrackItems = (
  path: string,
  character: Character,
  options: {
    insertOtherTrack?: boolean;
  },
) => {
  const seq = app.project.activeSequence;
  const playerPosition = seq.getPlayerPosition();
  const targetBin = findOrCreateBin("voice");

  const audioItem = importAudio(targetBin, path);
  if (!audioItem) return;

  const duration = getProjectItemDuration(audioItem);
  if (!duration) return;

  const audioClip = insertAudioToSequence({
    insertOtherTrack: options.insertOtherTrack,
    targetTime: playerPosition,
    audioItem,
    duration,
    trackIndex: character.voiceTrackIndex,
  });
  if (!audioClip) return;

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
