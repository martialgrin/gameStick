import * as CANVAS from "./DomElements/CreateCanvas";
import * as WEBCAM from "./DomElements/CreateWebcam";
import CreateScene from "./THREE/CreateScene";
import StickMan from "./Canvas/StickMan";
import Grid from "./Canvas/Grid";
import * as POSNET from "./ML5/PosNet";
import { ElementIsLoading } from "./Utils";
import PARAMS from "./PARAMS";
import Stats from "stats.js";

const stats = new Stats();

const Main = () => {
  if (PARAMS.dev.state) {
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    statsViewer();
  }
  WEBCAM.createContainer(PARAMS.video.width, PARAMS.video.height);
  VideoIsLoaded();
};

const VideoIsLoaded = () => {
  CANVAS.createCanvas(PARAMS.canvas.id);
  POSNET.LoadModel();
  ModelML5Loaded();

  // CreateScene();
};

const statsViewer = () => {
  stats.begin();
  stats.end();
  requestAnimationFrame(statsViewer);
};

const ModelML5Loaded = () => {
  // new Grid();
};

window.onload = () => {
  console.log("hello World");
  Main();
};

window.onresize = () => {
  // CANVAS.setFullScreen();
};
