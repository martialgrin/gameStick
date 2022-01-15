import PARAMS from "../../PARAMS";

const AnalyzePixels = (ctx) => {
  const w = PARAMS.canvas.width;
  const h = PARAMS.canvas.height;
  const array = [];
  const pixelData = ctx.getImageData(0, 0, w, h).data;
  return pixelData;
};

export default AnalyzePixels;
