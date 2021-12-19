/*********************
 Draw Sketch of Grid 
 *******************/

import PARAMS from "../PARAMS";
export default class Grid {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.nbBallsGrid = PARAMS.grid.nbBallsOnWidth;
    this.space = this.w / this.nbBallsGrid;
    this.init();
  }
  init() {
    console.log("Init Grid");
  }
  draw(counter) {
    for (let x = this.space; x <= this.w - this.space; x += this.space) {
      for (let y = this.space; y <= this.h - this.space; y += this.space) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.space / 2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.closePath();
      }
    }
  }
}
