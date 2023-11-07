import { parseTime } from "./parseTime";

export const getProjectItemDuration = (item: ProjectItem) => {
  const meta = item.getProjectMetadata();
  const regex =
    /<premierePrivateProjectMetaData:Column.Intrinsic.MediaDuration>(.*)<\/premierePrivateProjectMetaData:Column.Intrinsic.MediaDuration>/;
  const res = regex.exec(meta);
  if (!res) return;

  // duration format: hh:mm:ss:fffff
  const duration = res[1];
  return parseTime(duration);
};
