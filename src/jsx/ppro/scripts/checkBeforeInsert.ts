export const checkBeforeInsert = () => {
  if (app.isDocumentOpen()) throw new Error("Please open a project first");
  if (!app.project.activeSequence)
    throw new Error("Please select a sequence first");
  return true;
};
