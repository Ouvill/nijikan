export const replaceExt = (filePath: string, ext: string) => {
  return filePath.replace(/\.[^/.]+$/, ext);
};
