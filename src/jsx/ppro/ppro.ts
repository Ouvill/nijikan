import { fillMogrtText, forEachClip } from "./ppro-utils";

export { selectFolder } from "./scripts/selectFolder";
export const example = () => {};

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
