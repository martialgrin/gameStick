import PARAMS from "../PARAMS";

const AnalyzePixels = (ctx) => {
  let count = 0;
  const pixelData = ctx.getImageData(
    0,
    0,
    PARAMS.canvas.width,
    PARAMS.canvas.height
  ).data;

  const array = [];
  for (let x = 0; x < PARAMS.canvas.analyze.tiles.x; x++) {
    for (let y = 0; y < PARAMS.canvas.analyze.tiles.y; y++) {
      const posX = (x * PARAMS.canvas.width) / PARAMS.canvas.analyze.tiles.x;
      const posY = (y * PARAMS.canvas.height) / PARAMS.canvas.analyze.tiles.y;
      count++;
      array.push(pixelData[x]);
    }
  }
  return array;
};

export default AnalyzePixels;
