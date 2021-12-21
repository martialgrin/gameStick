import PARAMS from "../../PARAMS";

const AnalyzePixels = (ctx) => {
  const w = PARAMS.canvas.width;
  const h = PARAMS.canvas.height;
  const array = [];
  const pixelData = ctx.getImageData(0, 0, w, h).data;
  // for (let x = 0; x < w; x += PARAMS.canvas.analyze.tiles.x) {
  //   for (let y = 0; y < h; y += PARAMS.canvas.analyze.tiles.y) {
  //     let i = (x + y * (w / PARAMS.canvas.analyze.tiles.x)) * 4;

  //     let r = pixelData[i + 0];
  //     let g = pixelData[i + 1];
  //     let b = pixelData[i + 2];
  //     let a = pixelData[i + 3];
  //     if (r == 255) {
  //       console.log(r, g, b, a);
  //     }
  //     let l = (r + g + b) / 3;
  //     array.push(r, g, b, l);
  //   }
  // }

  // for (let i = 0; i < pixelData.length; i += 4) {
  //   let r = pixelData[i + 0];
  //   let g = pixelData[i + 1];
  //   let b = pixelData[i + 2];
  //   let a = pixelData[i + 3];
  //   let l = (r + g + b) / 3;
  //   array.push(r, g, b, l);
  // }

  return pixelData;
};

export default AnalyzePixels;
