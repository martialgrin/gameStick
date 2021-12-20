import PARAMS from "../../PARAMS";
import Points from "./Points";

/*********************
 Draw Sketch of Grid 
 *******************/

export default class Grid {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.c = "#000000";
    this.nbBallsGrid = PARAMS.grid.nbBallsOnWidth;
    this.space = this.w / this.nbBallsGrid;
    this.points = [];
    this.analyseArray = [];
    this.init();
  }
  init() {
    console.log("Init Grid");
    this.drawGrid();
  }

  getArray(array) {
    this.analyseArray = array;
    this.draw();
  }

  drawGrid() {
    for (let x = this.space; x <= this.w; x += this.space) {
      for (let y = this.space; y <= this.h; y += this.space) {
        this.points.push(new Points(this.ctx, x, y, this.space, this.c));
      }
    }
  }

  defineParams() {
    const array = [];
    let r = 0;
    for (let x = 0; x <= this.w; x += this.space) {
      for (let y = this.space; y <= this.h; y += this.space) {
        let i = (x + y * this.w) * 4;
        if (this.analyseArray[i + 0] < 255) {
          this.c = "#02BAB7";
        } else {
          this.c = "#F01A53";
        }

        if (this.analyseArray[i + 1] == 255) {
          r = this.space;
        } else {
          r = this.space / 10;
        }
        array.push({ r: r, c: this.c });
      }
    }
    return array;
  }

  draw() {
    const array = this.defineParams();
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].show(array[i].r, array[i].c);
    }
  }
}
