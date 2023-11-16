import { Connection, initCache } from "./cache";
import { getTrackEndTime } from "./getTrackEndTime";
import { findItemByPath, getParentItem } from "../ppro-utils";

type MogrtStore = { [key: string]: string };
export const mogrtStore = initCache<MogrtStore>({});

type BinStore = { [key: string]: ProjectItem };
const mogrtBins = initCache<BinStore>({});

const cacheKey = (str: string) => {
  return app.project.documentID + "_" + str;
};

function importMgtToProject(mogrtPath: string, store: Connection<MogrtStore>) {
  const endTime = getTrackEndTime(app.project.activeSequence.videoTracks[0]);

  const tmpMGT = app.project.activeSequence.importMGT(
    mogrtPath,
    endTime.ticks,
    0,
    0,
  );
  const mogrtBin = getParentItem(tmpMGT.projectItem);
  mogrtBins.set(app.project.documentID, mogrtBin);

  const key = cacheKey(mogrtPath);
  store.set(key, tmpMGT.projectItem.getMediaPath());
  const item = tmpMGT.projectItem;
  tmpMGT.remove(false, false);
  return item;
}

export function getMogrtProjectItem(
  mogrtPath: string,
  store: Connection<MogrtStore>,
) {
  const key = cacheKey(mogrtPath);
  const cachedPath = store.get(key);
  const mogrtBin = mogrtBins.get(app.project.documentID);
  if (cachedPath !== undefined && mogrtBin !== undefined) {
    const item = findItemByPath(mogrtBin, cachedPath);
    if (item !== undefined) {
      return item;
    }
  }
  return importMgtToProject(mogrtPath, store);
}
