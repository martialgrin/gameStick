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
      // if (
      //   (x == this.thumb.x && this.thumb.y == y) ||
      //   (x == this.index.x && this.index.y == y)
      //
      //   for (let i = 0; i < this.handArrayPos.length; i++) {
      //     if (this.handArrayPos[i][0] == x && this.handArrayPos[i][1] == y) {
      //       this.ctx.fillStyle =
      //         "rgb(" +
      //         pixelData[0] +
      //         "," +
      //         pixelData[1] +
      //         "," +
      //         pixelData[2] +
      //         ")";
      //       this.ctx.fillRect(posX, posY, this.size.w, this.size.h);
      //     }
      //   }
    }
  }
  return array;
};

export default AnalyzePixels;
