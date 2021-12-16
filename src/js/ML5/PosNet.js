import PARAMS from "../PARAMS";
import protoype from "./Prototyping/index";

let poseNet;

const LoadModel = (canvasApp) => {
  poseNet = ml5.poseNet(PARAMS.video.obj, modelLoaded.bind(this, canvasApp));
};

const modelLoaded = (canvasApp) => {
  const Game = canvasApp;
  poseNet.on("pose", (results) => {
    if (results.length > 0) {
      let pos = results[0].pose.keypoints;
      if (PARAMS.dev.state) {
        protoype(pos);
      }
      // for (let i = 0; i < pos.length; i++) {
      //   pos[i].position = normalizeValue(pos[i].position);
      // }
      PARAMS.poseNet.someoneIsFront = true;
      // POSES.key = results[0].pose.keypoints;
      Game.getData(pos);
      PARAMS.poseNet.isLoaded = true;
    } else {
      PARAMS.poseNet.someoneIsFront = false;
    }
  });
};

const normalizeEachPoint = () => {};

export { LoadModel };
