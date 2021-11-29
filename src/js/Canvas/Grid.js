import { calcAtan, map, calcSin, calcHypotenus } from "../Utils";
import stick from "./Stick";
import PARAMS from "../PARAMS";
import { PartsViewed } from "./Parts";

class Grid {
  constructor() {
    this.canvas = PARAMS.canvas.obj;

    this.pixelDensity = window.devicePixelRatio;
    console.log(this.pixelDensity);
    this.canvas.width = this.w = window.innerWidth * this.pixelDensity;
    this.canvas.height = this.h = window.innerHeight * this.pixelDensity;
    this.canvas.style.width = this.w / this.pixelDensity + "px";
    this.canvas.style.height = this.h / this.pixelDensity + "px";
    this.ctx = PARAMS.canvas.ctx;
    this.lineWidth = PARAMS.stick.lineWidth;
    this.nbBallsGrid = 20;
    this.init();
    this.PartsToDisplay = [];
    this.level = PARAMS.game.initialLevel;
    this.space = this.w / this.nbBallsGrid;
  }

  init() {
    console.log(calcAtan(0, 0, 3, 4));
    this.checkIfModelIsLoaded();
  }
  checkIfModelIsLoaded() {
    if (PARAMS.poseNet.isLoaded) {
      this.initListeners();
    } else {
      requestAnimationFrame(this.checkIfModelIsLoaded.bind(this));
    }
  }

  initListeners() {
    document.addEventListener("keyup", this.selectLevel.bind(this));
  }

  selectLevel(e) {
    if (e.code == "Digit" + e.key) {
      this.level = e.key;
    }
    console.log(this.level);
  }

  // DEpuis ML5 on pose

  getData(datas) {
    this.PartsToDisplay = PartsViewed(datas, this.level - 1);
    this.drawGrid();
    // console.log("ok");
  }

  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let x = this.space; x <= this.w - this.space; x += this.space) {
      for (let y = this.space; y <= this.h - this.space; y += this.space) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 30, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = "#000";
        this.ctx.closePath();
      }
    }
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    stick(this.ctx, this.PartsToDisplay, this.w, this.h);
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.closePath();
  }
}

//Tan

export default Grid;
