import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";
import { featureSelector } from "../../../store/selectors";
import { featureActions } from "../../../store/settings/feature";
import { Switch } from "../../../../../components/Switch";

export const FeatureConfig = () => {
  const dispatch = useAppDispatch();
  const features = useAppSelector(featureSelector);
    const onChangeLinkSubtitleClip = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(featureActions.setLinkSubtitleClip(event.target.checked));
      },
      [dispatch],
    );
    const onChangeLinkLypSync = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(featureActions.setLinkLipSyncClip(event.target.checked));
      },
      [dispatch],
    );

  const onChangeOverwriteTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setOverwriteTrack(e.target.checked));
  };

  const onChangeInsertImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setInsertImage(e.target.checked));
  };

    const onChangeLinkImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(featureActions.setLinkImageClip(e.target.checked));
    };

    const onChangeInsertLipSync = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(featureActions.setInsertLipSync(e.target.checked));
    };

  return (
    <div className={"flex flex-col gap-y-2"}>
      <div className={"flex justify-between hover:bg-gray-600"}>
        <p>字幕と音声をリンクする</p>
        <Switch
          onChange={onChangeLinkSubtitleClip}
          checked={features.linkSubtitleClip}
        ></Switch>
      </div>
      <div className={"flex justify-between hover:bg-gray-600"}>
        <p>立ち絵を挿入する</p>
        <Switch onChange={onChangeInsertImage} checked={features.insertImage} />
      </div>
      <div className={"flex justify-between hover:bg-gray-600 "}>
        <p>立ち絵を音声にリンクする</p>
        <Switch
          onChange={onChangeLinkImage}
          checked={features.linkImageClip}
        ></Switch>
      </div>
      <div className={"flex justify-between hover:bg-gray-600 "}>
        <p>口パクを挿入する</p>
        <Switch
          onChange={onChangeInsertLipSync}
          checked={features.insertLipSync}
        />
      </div>
      <div className={"flex justify-between hover:bg-gray-600 "}>
        <p>口パクを音声にリンクする</p>
        <Switch
          onChange={onChangeLinkLypSync}
          checked={features.linkLipSyncClip}
        />
      </div>
      <div className={"flex justify-between hover:bg-gray-600 "}>
        <p>トラックを上書きする</p>
        <Switch
          onChange={onChangeOverwriteTrack}
          checked={features.overwriteTrack}
        ></Switch>
      </div>
    </div>
  );
};
