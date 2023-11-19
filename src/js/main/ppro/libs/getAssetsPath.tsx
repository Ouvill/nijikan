import { csi } from "../../../lib/utils/bolt";
import path from "path";

const assetsPath = "/assets/";
export const getAssetsPath = () => {
  if (typeof window === "undefined" || typeof window.cep === "undefined")
    return;
  const extensionPath = csi.getSystemPath("extension");
  return path.join(extensionPath, assetsPath);
};
