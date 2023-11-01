import { http } from "../lib/cep/node";
import { csi, initBolt } from "../lib/utils/bolt";
import { Server } from "http";

initBolt();

let server: Server | undefined = undefined;

const main = () => {
  const hostEnv = csi.hostEnvironment;
  const appVersion = hostEnv.appVersion;
  const appId = hostEnv.appId;

  let port = 51180;
  switch (appId) {
    case "PPRO":
      port = 51181;
      break;

    case "AEFT":
      port = 51182;
      break;
  }

  server = http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Greeting from " + appId + " version " + appVersion);
    })
    .listen(port, "127.0.0.1");
};

window.onload = main;
window.onunload = () => {
  if (server !== undefined) {
    server.close();
  }
};
