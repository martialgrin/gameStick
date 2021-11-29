import PARAMS from "../PARAMS";
import { POSES } from "./POSES";
import { map } from "../Utils";

const normalRatio = 640 / 480;
const ratio = PARAMS.video.width / PARAMS.video.height;

const responsiveValue = (values) => {
  if (ratio != normalRatio) {
    // console.log("we have to do some responsive things");
    for (let i = 0; i < values.length; i++) {
      POSES.key[i].position.x = map(
        values[i].position.x,
        0,
        640,
        0,
        PARAMS.video.width
      );
      POSES.key[i].position.y = map(
        values[i].position.y,
        0,
        480,
        0,
        PARAMS.video.height
      );
    }
  }
};

const normalizeValue = (value) => {
  return {
    x: map(value.x, 0, PARAMS.video.width, 0, 1),
    y: map(value.y, 0, PARAMS.video.height, 0, 1),
  };
};

export { responsiveValue, normalizeValue };
