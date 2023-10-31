import { forEachLayer } from "./aeft-utils";

export const example = () => {};

export const helloAe = () => {};

export const appName = () => {
  return BridgeTalk.appName;
};

export const selectFile = () => {
  const filterString = Folder.fs === "Windows" ? "photoshop file:*.psd" : "";

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

const getCompItemFromLayer = (layer: Layer): CompItem | undefined => {
  if (layer instanceof AVLayer) {
    const avItem: AVItem = layer.source;
    if (avItem instanceof CompItem) {
      return avItem;
    }
  }
  return undefined;
};

const recursiveForEachLayer = (
  comp: CompItem,
  callback: (item: Layer, index: number) => void,
) => {
  forEachLayer(comp, (layer, index) => {
    const comp = getCompItemFromLayer(layer);
    if (comp) {
      callback(layer, index);
      recursiveForEachLayer(comp, callback);
    } else {
      callback(layer, index);
    }
  });
};

export const createComposionForNijikan = () => {
  const path = selectFile();
  if (!path) return;

  const item = createPsdComposition(path);

  if (item instanceof CompItem) {
    item.openInViewer();

    recursiveForEachLayer(item, (layer, index) => {});
  }
};
