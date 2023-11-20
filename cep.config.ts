import { CEP_Config } from "vite-cep-plugin";
import { version } from "./package.json";
import { password } from "./credential.json";

const config: CEP_Config = {
  version,
  id: "net.ouvill.nijikan",
  displayName: "Nijikan",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [
    // { name: "AEFT", version: "[0.0,99.9]" },
    { name: "PPRO", version: "[0.0,99.9]" },
  ],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: [
    "--v=0",
    "--enable-nodejs",
    "--mixed-context",
    "--allow-file-access",
  ],
  width: 500,
  height: 550,

  panels: [
    {
      mainPath: "./main/index.html",
      name: "main",
      panelDisplayName: "Nijikan",
      autoVisible: true,
      width: 600,
      height: 650,
    },
    // {
    //   mainPath: "./server/index.html",
    //   name: "server",
    //   autoVisible: false,
    //   type: "Custom",
    //   startOnEvents: ["com.adobe.csxs.events.ApplicationActivate"],
    //   width: 100,
    //   height: 100,
    // },
  ],
  build: {
    jsxBin: "off",
    sourceMap: true,
  },
  zxp: {
    country: "JP",
    province: "Tokyo",
    org: "Ouvill",
    password: password,
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off",
  },
  installModules: ["chokidar"],
  copyAssets: [""],
  copyZipAssets: [],
};
export default config;
