import PARAMS from "../PARAMS";

const AnalyzePixels = (ctx) => {
  let count = 0;
<<<<<<< HEAD
=======
  const pixelData = ctx.getImageData(
    0,
    0,
    PARAMS.canvas.width,
    PARAMS.canvas.height
  ).data;

>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
  const array = [];
  for (let x = 0; x < PARAMS.canvas.analyze.tiles.x; x++) {
    for (let y = 0; y < PARAMS.canvas.analyze.tiles.y; y++) {
      const posX = (x * PARAMS.canvas.width) / PARAMS.canvas.analyze.tiles.x;
      const posY = (y * PARAMS.canvas.height) / PARAMS.canvas.analyze.tiles.y;
      count++;
<<<<<<< HEAD

      const pixelData = ctx.getImageData(posX, posY, 1, 1).data;

      array.push(pixelData);
=======
      array.push(pixelData[x]);
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
    }
  }
  return array;
};

export default AnalyzePixels;
