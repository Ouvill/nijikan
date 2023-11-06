export const selectFolder = () => {

  const folder = Folder.selectDialog("Select a folder");
  if (folder) {
    return folder.fsName;
  } else {
    return "";
  }
};
