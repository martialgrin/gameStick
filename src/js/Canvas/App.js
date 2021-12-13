import { calcAtan, calcRadian, lerp, radianToDegree } from "../Utils";
import PARAMS from "../PARAMS";
import { AngleBetweenElements, PartsViewed } from "./Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
import { LensFlare } from "three";

class App {
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
    this.TargetLineWidth = this.lineWidth + PARAMS.targetStick.lineWidth;
    this.nbBallsGrid = PARAMS.grid.nbBallsOnWidth;
    this.ElementsParts = [];
    this.PartsToDisplay = [];
    this.LastAnglesArray = [0.1, 0.1, 0.1];
    this.level = PARAMS.game.initialLevel;
    this.space = this.w / this.nbBallsGrid;
    this.init();
  }

  // Initialise le stick pours plus tard
  init() {
    this.Stick = new DrawStick(this.ctx, this.PartsToDisplay);
    this.Target = new DrawStick(this.ctx, LEVELS[this.level - 1].target);
    this.loadBasicParamsForSketch();
    this.checkIfModelIsLoaded();
  }

  loadBasicParamsForSketch() {
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  // Start le sketch uniquement quand le modèle de PosNet est starté
  checkIfModelIsLoaded() {
    if (PARAMS.poseNet.isLoaded) {
      this.initListeners();
    } else {
      requestAnimationFrame(this.checkIfModelIsLoaded.bind(this));
    }
  }

  initListeners() {
    document.addEventListener("keyup", this.selectLevel.bind(this));
    this.draw();
  }

  selectLevel(e) {
    if (e.code == "Digit" + e.key) {
      this.level = e.key;
    }
    console.log("Level Selected: " + this.level);
  }

  getData(datas) {
    this.ElementsParts = AngleBetweenElements(datas, this.level - 1);
  }

  calcAngleForLine() {
    const array = [];
    for (let i = 0; i < this.ElementsParts.length; i++) {
      const start = this.ElementsParts[i][0].position;
      const end = this.ElementsParts[i][1].position;
      let angle = calcRadian(start.x, start.y, end.x, end.y);
      if (i == 0) {
        // console.log(radianToDegree(angle));
      }
      angle = lerp(this.LastAnglesArray[i], angle, 0.2);
      array.push(angle);
    }
    this.arrayElements = array;
    this.LastAnglesArray = this.arrayElements;
  }

  draw() {
    if (PARAMS.dev.state != true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.calcAngleForLine();
    this.checkLevel();
    this.drawTarget();
    this.drawGrid();
    this.drawStick();
    requestAnimationFrame(this.draw.bind(this));
  }

  checkLevel() {
    this.PartsInsideTarget = checkPartAndTarget(
      this.arrayElements,
      LEVELS[this.level - 1].targetsAngle,
      this.level - 1
    );
    if (this.PartsInsideTarget) {
      this.TargetLineWidth += 100;
      console.log("Yeah");
    }
  }

  drawGrid() {
    for (let x = this.space; x <= this.w - this.space; x += this.space) {
      for (let y = this.space; y <= this.h - this.space; y += this.space) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.closePath();
      }
    }
  }

  drawTarget() {
    this.ctx.save();
    this.ctx.beginPath();
    this.Target.draw(LEVELS[this.level - 1].targetsAngle);
    this.ctx.lineWidth = this.TargetLineWidth;
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  // Test Pour Loris
  drawStick() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.Stick.draw(this.arrayElements);
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.closePath();
  }
}

export default App;
