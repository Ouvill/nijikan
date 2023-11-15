import { SelectWatchFolder } from "./SelectWatchFolder";
import { useAppSelector } from "../../hooks/useReduxHooks";
import { watchFolderSelector } from "../../store/selectors";
import { FeatureConfig } from "./FeatureConfig";

export const AppConfig = () => {
  const watchFolder = useAppSelector(watchFolderSelector);

  return (
    <div className={"flex flex-col gap-2"}>
      <SelectWatchFolder watchFolderState={watchFolder}></SelectWatchFolder>
      <FeatureConfig></FeatureConfig>
    </div>
  );
};
