import PARAMS from "../../PARAMS";
const protoype = (points) => {
  const c = PARAMS.canvas;
  const ctx = c.ctx;
  ctx.clearRect(0, 0, c.width, c.height);
  if (PARAMS.poseNet.someoneIsFront) {
    const keypoints = points;
    const data = [];
    ctx.fillStyle = "red";

    keypoints.forEach((point) => {
      const x = point.position.x * window.devicePixelRatio;
      const y = point.position.y * window.devicePixelRatio;
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
