import React from "react";
import { useEffect } from "react";
import { useAppSelector } from "./useReduxHooks";
import {
  characterCollectionSelector,
  featureSelector,
  watchFolderSelector,
} from "../store/selectors";
import { watchAddVoice } from "../libs/watchAddVoice";
import { queue } from "../libs/queue";
import { insertCharacterTrackItems } from "../libs/insertCharacterTrackItems";
import { FeatureState } from "../store/settings/feature/state";
import { Characters } from "../store/settings/characters/type";
import { WatchFolderState } from "../store/settings/watchFolder/state";

const useWatchFolder = ({
  features,
  characters,
  watchFolderState,
}: {
  characters: Characters;
  features: FeatureState;
  watchFolderState: WatchFolderState;
}) => {
  useEffect(() => {
    if (watchFolderState.isWatching && watchFolderState.path !== "") {
      return watchAddVoice(
        watchFolderState.path,
        characters,
        (path, character) => {
          console.log("add voice", path, character);
          queue.add(async () => {
            await insertCharacterTrackItems(path, character, features);
          });
        },
      );
    }
  }, [
    watchFolderState.isWatching,
    watchFolderState.path,
    characters,
    features,
  ]);
};

export const SubscribeWatchFolder = () => {
  const watchFolderState = useAppSelector(watchFolderSelector);
  const characters = useAppSelector(characterCollectionSelector);
  const features = useAppSelector(featureSelector);
  useWatchFolder({
    watchFolderState,
    characters,
    features,
  });
  return <></>;
};
