import { fs, path } from "../../../lib/cep/node";
import { csi } from "../../../lib/utils/bolt";
import config from "../../../../../cep.config";

export const readJsonFile = (filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return;
  }
};
export const getSavePath = () => {
  // win : %USERPROFILE%\AppData\Roaming\%
  const userDataFolder: string = csi.getSystemPath("userData");
  return path.join(userDataFolder, config.displayName, "config.json");
};
const ensureDirectoryExistence = (filePath: string) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
export const saveDataToJsonFile = (data: object, path: string) => {
  ensureDirectoryExistence(path);
  const jsonString = JSON.stringify(data);
  fs.writeFileSync(path, jsonString);
};
