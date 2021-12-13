import PARAMS from "../PARAMS";
import { POSES } from "./POSES";
import App from "./../Canvas/App";
import protoype from "./Prototyping/index";
import { normalizeValue } from "./changeValue";

let poseNet;

const LoadModel = () => {
  poseNet = ml5.poseNet(PARAMS.video.obj, modelLoaded.bind(this));
};

const modelLoaded = () => {
  const Game = new App();
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
