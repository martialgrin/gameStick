import PARAMS from "../PARAMS";
import { POSES } from "./POSES";
import Grid from "./../Canvas/Grid";
import protoype from "./Prototyping/index";
import { normalizeValue } from "./changeValue";

let poseNet;

const LoadModel = () => {
  poseNet = ml5.poseNet(PARAMS.video.obj, modelLoaded.bind(this));
};

const modelLoaded = () => {
  const app = new Grid();
  poseNet.on("pose", (results) => {
    if (results.length > 0) {
      let pos = results[0].pose.keypoints;
      for (let i = 0; i < pos.length; i++) {
        pos[i].position = normalizeValue(pos[i].position);
      }
      // console.log(pos);
      PARAMS.poseNet.someoneIsFront = true;
      // POSES.key = results[0].pose.keypoints;
      app.getData(results[0].pose.keypoints);
      // responsiveValue(results[0].pose.keypoints);
      PARAMS.poseNet.isLoaded = true;
    } else {
      PARAMS.poseNet.someoneIsFront = false;
    }
    if (PARAMS.dev.state) {
      // protoype();
    }
  });
};

export { LoadModel };
