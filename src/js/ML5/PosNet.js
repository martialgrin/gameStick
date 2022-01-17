import { endLoader } from "../Loading/loader";
import PARAMS from "../PARAMS";
import protoype from "./Prototyping/index";

let poseNet;

const LoadModel = (canvasApp) => {
  poseNet = ml5.poseNet(PARAMS.video.obj, modelLoaded.bind(this, canvasApp));
};

const modelLoaded = (canvasApp) => {
  const Game = canvasApp;
  console.log("ML5 Model is Loaded");
  PARAMS.loader.loop = false;
  poseNet.on("pose", (results) => {
    if (results.length > 0) {
      let pos = results[0].pose.keypoints;
      if (PARAMS.dev.state) {
        protoype(pos);
      }
      PARAMS.poseNet.someoneIsFront = true;
      Game.getData(pos);
      PARAMS.poseNet.isLoaded = true;
    } else {
      PARAMS.poseNet.someoneIsFront = false;
    }
  });
};

export { LoadModel };
