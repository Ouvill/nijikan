export const example = () => {};

export const helloAe = () => {};

export const appName = () => {
  return BridgeTalk.appName;
};

export const selectFile = () => {
  const filterString = Folder.fs === "Windows" ? "All files:*.*" : "";

  const file = File.openDialog(
    "", //title
    filterString, // filter available files?
    false, // allow multiple?
  );

  if (file) {
    return file.fsName;
  }
  return "";
};
