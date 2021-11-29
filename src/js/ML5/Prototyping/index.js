import PARAMS from "../../PARAMS";
import POSES from "../POSES";

const protoype = () => {
  const c = PARAMS.canvas;
  const ctx = c.ctx;
  ctx.clearRect(0, 0, c.width, c.height);
  if (PARAMS.poseNet.someoneIsFront) {
    ctx.fillStyle = "red";
    const keypoints = POSES.key;
    const data = [];
    keypoints.forEach((point) => {
      const x = point.position.x;
      const y = point.position.y;
      data.push(x);
      data.push(y);
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    });
  }
};

export default protoype;
