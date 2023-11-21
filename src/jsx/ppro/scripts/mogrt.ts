import { Connection, initCache } from "./cache";
import { getTrackEndTime } from "./getTrackEndTime";
import { findItemByPath, getParentItem } from "../ppro-utils";

type MogrtStore = {
  [key: string]: {
    projectMogrtPath: string;
    originModified: Date;
  };
};
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
  // cache mogrt bin
  const mogrtBin = getParentItem(tmpMGT.projectItem);
  mogrtBins.set(app.project.documentID, mogrtBin);

  // cache project mogrt path
  const key = cacheKey(mogrtPath);
  const modified = new File(mogrtPath).modified;

  store.set(key, {
    projectMogrtPath: tmpMGT.projectItem.getMediaPath(),
    originModified: modified,
  });
  const item = tmpMGT.projectItem;
  tmpMGT.remove(false, false);
  return item;
}

export function getMogrtProjectItem(
  mogrtPath: string,
  store: Connection<MogrtStore>,
) {
  // check cache
  const key = cacheKey(mogrtPath);
  const cacheData = store.get(key);
  const mogrtBin = mogrtBins.get(app.project.documentID);
  if (cacheData !== undefined && mogrtBin !== undefined) {
    // check modified
    const modified = new File(mogrtPath).modified;
    if (modified.getTime() > cacheData.originModified.getTime()) {
      return importMgtToProject(mogrtPath, store);
    } else {
      const item = findItemByPath(mogrtBin, cacheData.projectMogrtPath);
      if (item !== undefined) {
        return item;
      }
    }
  }
  // cache not found
  return importMgtToProject(mogrtPath, store);
}
