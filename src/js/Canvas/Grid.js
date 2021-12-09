import { calcAtan, calcRadian, radianToDegree } from "../Utils";
import PARAMS from "../PARAMS";
import { AngleBetweenElements, PartsViewed } from "./Parts";
import Stick from "./Stick_Archive";
import DrawStick from "./DrawStick";

class Grid {
  constructor() {
    this.canvas = PARAMS.canvas.obj;
    this.pixelDensity = window.devicePixelRatio;
    this.canvas.width = this.w = window.innerWidth * this.pixelDensity;
    this.canvas.height = this.h = window.innerHeight * this.pixelDensity;

    PARAMS.canvas.width = this.w;
    PARAMS.canvas.height = this.h;
    this.canvas.style.width = this.w / this.pixelDensity + "px";
    this.canvas.style.height = this.h / this.pixelDensity + "px";
    this.ctx = PARAMS.canvas.ctx;
    this.lineWidth = PARAMS.stick.lineWidth;
    this.nbBallsGrid = PARAMS.grid.nbBallsOnWidth;
    this.PartsToDisplay = [];
    this.level = PARAMS.game.initialLevel;
    this.space = this.w / this.nbBallsGrid;
    this.init();
  }

  init() {
    this.Stick = new DrawStick(this.ctx, this.PartsToDisplay);
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
    console.log("Level Selected: " + this.level);
  }

  // Depuis ML5 OnPose
  getData(datas) {
    this.PartsToDisplay = PartsViewed(datas, this.level - 1);
    this.ElementsParts = AngleBetweenElements(datas, this.level - 1);
    this.calcAngleForLine();
    this.draw();
  }

  calcAngleForLine() {
    const array = [];
    for (let i = 0; i < this.ElementsParts.length; i++) {
      const start = this.ElementsParts[i][0].position;
      const end = this.ElementsParts[i][1].position;
      const angle = calcRadian(start.x, start.y, end.x, end.y);
      array.push(angle);
    }
    this.arrayElements = array;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawStick();
  }
  drawGrid() {
    for (let x = this.space; x <= this.w - this.space; x += this.space) {
      for (let y = this.space; y <= this.h - this.space; y += this.space) {
        this.ctx.beginPath();
        // this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = "#000";
        this.ctx.closePath();
      }
    }
  }
  drawStick() {
    this.ctx.beginPath();
    this.ctx.lineCap = "round";
    this.Stick.draw(this.arrayElements);
    // stick(this.ctx, this.PartsToDisplay);
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.closePath();
  }
}

//Tan

export default Grid;
