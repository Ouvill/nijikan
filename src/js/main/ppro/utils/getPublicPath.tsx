import {csi} from "../../../lib/utils/bolt";
import path from "path";

const publicPath = "/public/";
export const getPublicPath = () => {
    const extensionPath = csi.getSystemPath("extension");
    return path.join(extensionPath, publicPath);
};