import { convertTrackItemIndexToQeIndex } from "./convertTrackItemIndexToQeIndex";

export const applyEffect = (
  trackIndex: number,
  clip: number,
  CompMatchName: string,
) => {
  if (qe === undefined) app.enableQE();
  if (qe === undefined) return;

  const qeIndexes = convertTrackItemIndexToQeIndex(
    app.project.activeSequence.videoTracks[trackIndex],
  );
  const qeClip = qe.project
    .getActiveSequence()
    .getVideoTrackAt(trackIndex)
    .getItemAt(qeIndexes[clip]);
  const effect = qe.project.getVideoEffectByName(CompMatchName, true);
  qeClip.addVideoEffect(effect);
};