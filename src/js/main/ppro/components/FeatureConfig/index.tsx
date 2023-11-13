import { useAppDispatch, useAppSelector } from "../../hooks/useReduxHooks";
import { featureSelector } from "../../store/selectors";
import { featureActions } from "../../store/settings/feature";

export const FeatureConfig = () => {
  const dispatch = useAppDispatch();
  const features = useAppSelector(featureSelector);

  const onChangeOverwriteTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setOverwriteTrack(e.target.checked));
  };

  const onChangeInsertLipSync = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(featureActions.setInsertLipSync(e.target.checked));
  };

  return (
    <div>
      <div className={"flex justify-between"}>
        <p>トラックを上書きする</p>
        <input
          type={"checkbox"}
          onChange={onChangeOverwriteTrack}
          checked={features.overwriteTrack}
        ></input>
      </div>
      <div className={"flex justify-between"}>
        <p>口パクを挿入する</p>
        <input
          type={"checkbox"}
          onChange={onChangeInsertLipSync}
          checked={features.insertLipSync}
        />
      </div>
    </div>
  );
};
