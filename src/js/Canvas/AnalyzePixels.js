import PARAMS from "../PARAMS";

const AnalyzePixels = (ctx) => {
  let count = 0;
  const array = [];
  for (let x = 0; x < PARAMS.canvas.analyze.tiles.x; x++) {
    for (let y = 0; y < PARAMS.canvas.analyze.tiles.y; y++) {
      const posX = (x * PARAMS.canvas.width) / PARAMS.canvas.analyze.tiles.x;
      const posY = (y * PARAMS.canvas.height) / PARAMS.canvas.analyze.tiles.y;
      count++;

      const pixelData = ctx.getImageData(posX, posY, 1, 1).data;

      array.push(pixelData);
    }
  }
  return array;
};

export default AnalyzePixels;
