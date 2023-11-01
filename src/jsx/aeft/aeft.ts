import { forEachLayer } from "./aeft-utils";

export const example = () => {};

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

function recursiveForEachLayerFunc<T>(
  comp: CompItem,
  callback: (item: Layer, index: number, data: T) => T,
  initialData: T,
) {
  forEachLayer(comp, (layer, index) => {
    const comp = getCompItemFromLayer(layer);
    if (comp) {
      const acc = callback(layer, index, initialData);
      recursiveForEachLayerFunc(comp, callback, acc);
    } else {
      callback(layer, index, initialData);
    }
  });
}

type PathData = {
  filename: string;
  ancestors: string[];
};

export const createComposionForNijikan = () => {
  const path = selectFile();
  if (!path) return;

  const item = createPsdComposition(path);

  if (item instanceof CompItem) {
    item.openInViewer();

    const initialData: PathData = {
      filename: new File(path).name,
      ancestors: [],
    };

    recursiveForEachLayerFunc(
      item,
      (layer, index, data): PathData => {
        const parent = layer.containingComp.name;
        const layerPath = [...data.ancestors, parent, layer.name].join("/");

        layer.enabled = true;
        layer.transform.opacity.expression = `
        const items = footage("data.json").sourceData.items
        const index = items.findIndex((element) => element.sTime <= time && time < element.eTime )
        if (index != -1 && items[index].layers.includes("${layerPath}")) {
          transform.opacity = 100
        } else {
          transform.opacity = 0
        }
        `;

        return {
          filename: data.filename,
          ancestors: [...data.ancestors, parent],
        };
      },
      initialData,
    );
  }
};
