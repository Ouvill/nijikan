export const findOrCreateBin = (name: string) => {
  const children = app.project.rootItem.children;
  for (let i = 0; i < children.numItems; i++) {
    const child = children[i];
    if (child.type == 2 /* BIN */ && child.name === name) {
      return child;
    }
  }
  return app.project.rootItem.createBin(name);
};
