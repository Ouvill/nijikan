import { forEachLayer } from "./aeft-utils";

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

export const createPsdComposition = (path: string) => {
  const file = new File(path);

  const importOptions = new ImportOptions(file);
  importOptions.importAs = ImportAsType.COMP;

  return app.project.importFile(importOptions);
};

const recursiveForEachLayer = (
  comp: CompItem,
  callback: (item: Layer, index: number) => void,
) => {
  forEachLayer(comp, (layer, index) => {
    if (layer instanceof AVLayer) {
      const avItem: AVItem = layer.source;
      if (avItem instanceof CompItem) {
        callback(layer, index);
        recursiveForEachLayer(avItem, callback);
      }
    } else {
      callback(layer, index);
    }
  });
};

export const selectAndCreatePsdComposition = () => {
  const path = selectFile();
  if (!path) return;

  const item = createPsdComposition(path);

  if (item instanceof CompItem) {
    item.openInViewer();

    recursiveForEachLayer(item, (layer, index) => {
      layer.name = `Layer ${index}`;
    });
  }
};
