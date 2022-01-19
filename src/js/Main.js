import * as CANVAS from "./DomElements/CreateCanvas";
import * as WEBCAM from "./DomElements/CreateWebcam";
import * as POSNET from "./ML5/PosNet";
import App from "./Canvas/App";
import PARAMS from "./PARAMS";
import Stats from "stats.js";
import Loader from "./Loading/loader";

const stats = new Stats();

const Main = () => {
  if (!PARAMS.dev.state) {
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    statsViewer();
  }
  new Loader();
  WEBCAM.createContainer(PARAMS.video.width, PARAMS.video.height);
  VideoIsLoaded();
};

const VideoIsLoaded = () => {
  CANVAS.createCanvas(PARAMS.canvas.id);
  // Create APP
  const canvasApp = new App();
  POSNET.LoadModel(canvasApp);
  ModelML5Loaded();

  // CreateScene();
};

const statsViewer = () => {
  stats.begin();
  stats.end();
  requestAnimationFrame(statsViewer);
};

const ModelML5Loaded = () => {};

window.onload = () => {
  console.log("hello World");
  Main();
};

window.onresize = () => {
  // CANVAS.setFullScreen();
};
