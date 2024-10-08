// Please do not write comments in Japanese.
// I don't know why, but it stops working.
import { fillMogrtText, findItemByPath, forEachClip } from "./ppro-utils";
import { findOrCreateBin } from "./scripts/findOrCreateBin";
import { getAudioDuration } from "./scripts/getDuration";
import { checkInsertable } from "./scripts/checkInsertable";
import { linkClips } from "./scripts/linkClips";
import {
  findClipByStartTime,
  getClipIndexByStartTime,
} from "./scripts/findClipByStartTime";
import type { Character } from "../../js/main/ppro/store/settings/characters/type";
import type { FeatureState } from "../../js/main/ppro/store/settings/feature/state";
import { setClipMotionValue } from "./scripts/setClipMotionValue";
import { ns } from "../../shared/shared";
import { getMogrtProjectItem, mogrtStore } from "./scripts/mogrt";
import { applyEffect } from "./scripts/qe/applyEffect";
import { ComponentMatchName } from "./constant";
import { JsxError, Result } from "./scripts/results";
import { JsxErrors } from "./scripts/jsxErrors";

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

const searchInsertableTrack = (
  targetTime: Time,
  duration: Time,
  defaultIndex: number,
  trackType: "audioTracks" | "videoTracks",
): number => {
  const num = app.project.activeSequence[trackType].numTracks;
  for (let i = defaultIndex; i < num; i++) {
    const track = app.project.activeSequence[trackType][i];
    if (checkInsertable(targetTime, duration, track) !== -1) {
      return i;
    }
  }
  return -1;
};

const haveEnoughTrack = (
  seq: Sequence,
  trackIndex: number,
  trackType: "audioTracks" | "videoTracks",
) => {
  return seq[trackType].numTracks > trackIndex;
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
  const originInPoint: Time = videoItem.getInPoint();
  // @ts-ignore
  const originOutPoint: Time = videoItem.getOutPoint();
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
  if (!haveEnoughTrack(seq, trackIndex, "audioTracks")) {
    const numAudio = trackIndex - seq.audioTracks.numTracks + 1;
    addAudioTrack(numAudio, seq.audioTracks.numTracks);
  }

  if (overwriteTrack) {
    return overwriteAudioClip(audioItem, targetTime, trackIndex);
  } else {
    let targetIndex = searchInsertableTrack(
      targetTime,
      duration,
      trackIndex,
      "audioTracks",
    );
    if (targetIndex === -1) {
      targetIndex = seq.audioTracks.numTracks;
      addAudioTrack(1, targetIndex);
    }
    return overwriteAudioClip(audioItem, targetTime, targetIndex);
  }
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
}): {
  clip: TrackItem | undefined;
  trackIndex: number;
} {
  const seq = app.project.activeSequence;

  // add audio track if needed
  if (!haveEnoughTrack(seq, trackIndex, "videoTracks")) {
    const needTrackNum = trackIndex - seq.videoTracks.numTracks + 1;
    addVideoTrack(needTrackNum, seq.videoTracks.numTracks);
  }

  if (overwriteTrack) {
    return {
      clip: overwriteVideoClip(videoItem, duration, targetTime, trackIndex),
      trackIndex: trackIndex,
    };
  } else {
    let targetIndex = searchInsertableTrack(
      targetTime,
      duration,
      trackIndex,
      "videoTracks",
    );
    if (targetIndex === -1) {
      targetIndex = seq.videoTracks.numTracks;
      addVideoTrack(1, targetIndex);
    }
    return {
      clip: overwriteVideoClip(videoItem, duration, targetTime, targetIndex),
      trackIndex: targetIndex,
    };
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
}): Result<void, JsxError> => {
  const seq = app.project.activeSequence;
  const playerPosition = seq.getPlayerPosition();
  const targetBin = findOrCreateBin("voice");
  let clips: TrackItem[] = [];

  // audio
  const audioItem = importFile(targetBin, voicePath);
  // ファイルの読み込みにエラーが発生しました
  if (!audioItem) return { isSuccess: false, error: JsxErrors.ImportFileError };

  const duration = getAudioDuration(audioItem);
  if (!duration) return { isSuccess: false, error: JsxErrors.GetDurationError };

  const audioClip = insertAudioToSequence({
    overwriteTrack: features.overwriteTrack,
    targetTime: playerPosition,
    audioItem,
    duration,
    trackIndex: character.voiceTrackIndex,
  });
  if (!audioClip) return { isSuccess: false, error: JsxErrors.InsertError };
  clips.push(audioClip);

  // image
  if (
    features.insertImage &&
    character.enableImage &&
    character.imagePath !== ""
  ) {
    const extensionBin = findOrCreateBin(ns.split(".").slice(-1)[0]);
    let image = findItemByPath(extensionBin, character.imagePath);
    if (image === undefined) {
      image = importFile(extensionBin, character.imagePath);
    }
    if (!image) return { isSuccess: false, error: JsxErrors.ImportFileError };

    // insert image to sequence
    const insertedImageInfo = insertVideoToSequence({
      overwriteTrack: features.overwriteTrack,
      targetTime: playerPosition,
      videoItem: image,
      duration,
      trackIndex: character.imageVidTrackIndex,
    });
    const imageClip = insertedImageInfo.clip;

    // set position & scale
    if (!imageClip) return { isSuccess: false, error: JsxErrors.InsertError };
    setClipMotionValue({
      seq: app.project.activeSequence,
      clip: imageClip,
      position: character.imagePosition,
      scale: character.imageScale,
    });

    // flip
    if (character.imageHorizontalFlip) {
      const index = getClipIndexByStartTime(
        app.project.activeSequence.videoTracks[insertedImageInfo.trackIndex],
        playerPosition,
      );
      if (index === -1)
        return { isSuccess: false, error: JsxErrors.ApplyEffectError };
      applyEffect(
        insertedImageInfo.trackIndex,
        index,
        ComponentMatchName.HorizontalFlip,
      );
    }

    if (features.linkImageClip) {
      clips.push(imageClip);
    }
  }

  // lip sync
  if (
    features.insertLipSync &&
    character.enableLipSync &&
    character.lipSyncMogrtPath
  ) {
    let lipSyncMogrtItem: ProjectItem;
    try {
      lipSyncMogrtItem = getMogrtProjectItem(
        character.lipSyncMogrtPath,
        mogrtStore,
      );
    } catch (e) {
      return { isSuccess: false, error: JsxErrors.ImportMogrtError };
    }

    const insertedLipSyncMogrtInfo = insertVideoToSequence({
      overwriteTrack: features.overwriteTrack,
      targetTime: playerPosition,
      videoItem: lipSyncMogrtItem,
      duration,
      trackIndex: character.lipSyncVidTrackIndex,
    });
    const lipSyncMogrtClip = insertedLipSyncMogrtInfo.clip;
    if (!lipSyncMogrtClip)
      return {
        isSuccess: false,
        error: JsxErrors.InsertError,
      };
    fillMogrtText(lipSyncMogrtClip, "lab", lab);

    // set position & scale
    setClipMotionValue({
      seq: app.project.activeSequence,
      clip: lipSyncMogrtClip,
      position: character.imagePosition,
      scale: character.imageScale,
    });

    // flip
    if (character.imageHorizontalFlip) {
      const index = getClipIndexByStartTime(
        app.project.activeSequence.videoTracks[
          insertedLipSyncMogrtInfo.trackIndex
        ],
        playerPosition,
      );
      if (index === -1)
        return { isSuccess: false, error: JsxErrors.ApplyEffectError };
      applyEffect(
        insertedLipSyncMogrtInfo.trackIndex,
        index,
        ComponentMatchName.HorizontalFlip,
      );
    }

    if (features.linkLipSyncClip) {
      clips.push(lipSyncMogrtClip);
    }
  }

  // subtitle
  if (
    features.insertSubtitle &&
    character.enableSubtitle &&
    character.subtitleMogrtPath
  ) {
    let subtitleMogrtItem: ProjectItem;
    try {
      subtitleMogrtItem = getMogrtProjectItem(
        character.subtitleMogrtPath,
        mogrtStore,
      );
    } catch (e) {
      return { isSuccess: false, error: JsxErrors.ImportMogrtError };
    }
    const subtitleMogrtClip = insertVideoToSequence({
      overwriteTrack: features.overwriteTrack,
      targetTime: playerPosition,
      videoItem: subtitleMogrtItem,
      duration,
      trackIndex: character.subtitleTrackIndex,
    }).clip;
    if (!subtitleMogrtClip)
      return { isSuccess: false, error: JsxErrors.InsertError };
    // fill text
    fillMogrtText(subtitleMogrtClip, character.subtitleParamName, subtitle);
    // rename clip
    subtitleMogrtClip.name =
      subtitle.length > 20 ? subtitle.slice(0, 20) : subtitle;

    if (features.linkSubtitleClip) {
      clips.push(subtitleMogrtClip);
    }
  }

  // link clips
  linkClips(clips, seq);

  if (features.movePlayerPosition) {
    app.project.activeSequence.setPlayerPosition(audioClip.end.ticks);
  }
  return { isSuccess: true, value: undefined };
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
