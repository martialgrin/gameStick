import PARAMS from "../../PARAMS";
import { lerp, map } from "../../Utils";
import * as PIXI from "pixi.js";
import Points from "./Points";
import { easeInBack } from "js-easing-functions";

/*********************
 Draw Sketch of Grid 
 *******************/

const RADIUS = 0.5;
const RGB_DIV255 = 1 / 255;
const DIV3 = 1 / 3;
const OFFSET_Y = Math.sqrt((RADIUS * 2) ** 2 - RADIUS ** 2);

export default class Grid {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.analysedCanvas = PARAMS.canvas.ctx;

    this.canvas.width = PARAMS.canvas.width * PARAMS.canvas.divisionResolution;
    this.canvas.height =
      PARAMS.canvas.height * PARAMS.canvas.divisionResolution;

    this.ctx = this.canvas.getContext("2d");

    this.scale = [];
    this.cells = [];

    this.mult = 4;
    this.firstRead = true;

    //this.container = new PIXI.Container();

    this.setup();
  }

  setup() {
    this.app = new PIXI.Application({
      width: this.canvas.width,
      height: this.canvas.height,
      backgroundColor: PARAMS.colorScheme.opt1.bg,
      resolution: PARAMS.canvas.pixelRatio,
      antialias: true,
    });
    document.body.appendChild(this.app.view);
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.drawGrid();

    const { stage } = this.app;
  }

  drawGrid() {
    for (let column = 0; column < PARAMS.grid.columns; column++) {
      for (let row = 0; row < PARAMS.grid.rows; row++) {
        const offsetX = (row % 2) * 0.5;
        const ellipse = new Points({
          x: column + offsetX - 0.25,
          y: row * OFFSET_Y + OFFSET_Y - 0.25,
          row,
          column,
          radius: 0.5 * this.mult,
          scale: 1,
          scale: 1,
          width: this.app.width,
          height: this.app.height,
        });
        ellipse.generate();

        this.cells.push(ellipse);
        this.container.addChild(ellipse.graphics);
      }
    }

    // Move container to the center
    this.container.x = this.canvas.width / 6;
    this.container.y = this.canvas.height / 6;

    // Center sprite in local container coordinates
    this.container.pivot.x = PARAMS.grid.columns / 2 + 0.25;
    this.container.pivot.y = PARAMS.grid.rows / 2;
    this.container.scale.set(this.canvas.width / (PARAMS.grid.columns - 2) / 3);

    // Listen for animate update
    //this.app.ticker.add(this.draw.bind(this));
    if (this.firstRead == true) {
      this.mouseDown();
      this.firstRead = false;
    }
  }

  draw(ctx) {
    this.analysedCanvas = ctx;
    const { cells } = this;
    let i = cells.length;
    const pixels = this.analyzePixels(this.analysedCanvas);

    for (; i--; ) {
      const child = cells[i];
      const color = this.getPixelHexColor(child.column, child.row, pixels);
      const [r, g, b] = color;
      //let luminosity = (r + g + b) * DIV3;
      //luminosity = map(luminosity ** 0.5, 0, 1, 1, 0.2);

      //? si pas de corp
      if (color[1] != 1) {
        //! gris
        child.setColor(PARAMS.colorScheme.opt1.c3);
      }
      //? si corp
      else if (color[1] == 1) {
        //! cyan
        child.setColor(PARAMS.colorScheme.opt1.c2);
      } else {
        //! violet
        child.setColor(PARAMS.colorScheme.opt1.c3);
      }
      if (color[0] == 1 && color[1] != 1) {
        //! gris
        child.setColor(PARAMS.colorScheme.opt1.c1);
      }
      if (color[2] == 1) {
        //! gris cyan
        child.setColor(PARAMS.colorScheme.opt1.c4);
        child.setScale(0.6 / this.mult);
      }

      //? si recherche et corp
      if (color[0] == 1 && color[1] == 1) {
        child.setScale(1 / this.mult);
      }
      //? si recherche
      else if (color[0] == 1) {
        child.setScale(0.6 / this.mult);
      }
      //? si corp mais pas recherche
      else if (color[1] == 1 && color[0] != 1) {
        child.setScale(0.6 / this.mult);
      } else {
        child.setScale(0.3 / this.mult);
      }

      if (color[2] == 1) {
        child.setColor(PARAMS.colorScheme.opt1.c4);
        child.setScale(0.45 / this.mult);
      }

      child.update();
    }
  }

  analyzePixels(ctx) {
    const { width, height } = ctx.canvas;
    this.pixelData = ctx.getImageData(0, 0, width, height).data;
    return this.pixelData;
  }

  getPixelHexColor(column, row, pixelData) {
    const { width, height } = PARAMS.canvas;
    // prettier-ignore
    const x = map(column , 0, PARAMS.grid.columns, 0, width);
    // prettier-ignore
    const y = map(row + 0.5 , 0, PARAMS.grid.rows, 0, height);
    // ~~ = Math.floor()
    const i = (~~x + ~~y * width) * 4;

    const r = pixelData[i + 0] * RGB_DIV255;
    const g = pixelData[i + 1] * RGB_DIV255;
    const b = pixelData[i + 2] * RGB_DIV255;

    return [r, g, b];
  }

  mouseDown() {
    const { cells } = this;
    document.addEventListener("click", function () {
      let i = cells.length;
      for (; i--; ) {
        const child = cells[i];
        child.setPos();
      }
    });
  }
}
