import { addTime, fillMogrtText } from "./ppro-utils";

export const example = () => {};

export const appName = () => {
  return BridgeTalk.appName;
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
  alert(clip.name);
  const t = new Time();
  t.seconds = targetSec;

  clip.start.seconds = 1;
};
