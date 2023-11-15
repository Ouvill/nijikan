import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { featureSelector } from "../../../store/selectors";
import { featureActions } from "../../../store/settings/feature";
import { ToggleButton } from "../../../../../components/ToggleButton";

export const FeatureConfig = () => {
  const dispatch = useAppDispatch();
  const features = useAppSelector(featureSelector);
  const onChangeLinkClip = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(featureActions.setLinkClips(event.target.checked));
    },
    [dispatch],
  );

  const onChangeOverwriteTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setOverwriteTrack(e.target.checked));
  };

  const onChangeInsertLipSync = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setInsertLipSync(e.target.checked));
  };

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"flex justify-between"}>
        <p>クリップをリンクする</p>
        <ToggleButton
          onChange={onChangeLinkClip}
          checked={features.linkClips}
        ></ToggleButton>
      </div>
      <div className={"flex justify-between"}>
        <p>口パクを挿入する</p>
        <ToggleButton
          onChange={onChangeInsertLipSync}
          checked={features.insertLipSync}
        />
      </div>
      <div className={"flex justify-between"}>
        <p>トラックを上書きする</p>
        <ToggleButton
          onChange={onChangeOverwriteTrack}
          checked={features.overwriteTrack}
        ></ToggleButton>
      </div>
    </div>
  );
};
