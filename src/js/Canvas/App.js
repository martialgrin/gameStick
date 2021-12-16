import { map, calcRadian, lerp, radianToDegree } from "../Utils";
import PARAMS from "../PARAMS";
import { AngleBetweenElements } from "./Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";

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
    this.nbBallsGrid = PARAMS.grid.nbBallsOnWidth;
    this.ElementsParts = [];
    this.PartsToDisplay = [];
    this.LastAnglesArray = [];

    this.space = this.w / this.nbBallsGrid;
    this.init();
  }
  // Initialise le stick pours plus tard
  init() {
    this.loadBasicParamsForSketch();
    this.Stick = new DrawStick(this.ctx, this.PartsToDisplay);
    this.Target = new DrawStick(this.ctx, LEVELS[this.level].target);
    this.checkIfModelIsLoaded();
  }
  loadBasicParamsForSketch() {
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.level = PARAMS.game.initialLevel - 1;
    this.lineWidth = PARAMS.stick.lineWidth;
    this.posXSitckyPoint = 0;
    this.LastPosXStickyPoint = 0;
    this.TargetLineWidth = this.lineWidth + PARAMS.targetStick.lineWidth;
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
  // To test if Last Element as an Array
  initLastAngleArray() {
    if (this.LastAnglesArray.length == 0) {
      for (let i = 0; i < this.ElementsParts.length; i++) {
        this.LastAnglesArray.push(0.001);
      }
    }
  }
  selectLevel(e) {
    if (e.code == "Digit" + e.key) {
      this.LastAnglesArray = [];
      this.level = e.key - 1;
    }
    console.log("Level Selected: " + this.level + 1);
  }
  getData(datas) {
    this.ElementsParts = AngleBetweenElements(datas, this.level);
  }

  calcAngleForLine() {
    this.initLastAngleArray();
    const array = [];
    this.posXSitckyPoint = map(
      this.ElementsParts[0][0].position.x,
      0,
      PARAMS.video.width,
      0,
      1
    );
    this.posXSitckyPoint = lerp(
      this.LastPosXStickyPoint,
      this.posXSitckyPoint,
      0.02
    );
    this.LastPosXStickyPoint = this.posXSitckyPoint;
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
    // Store Last Element for the Next Frame
    this.LastAnglesArray = this.arrayElements;
  }

  // Main Loop
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
      LEVELS[this.level].targetsAngle,
      this.level
    );
    if (this.PartsInsideTarget) {
      /****************************************
       Code When You're stick is in the target
       ***************************************/

      this.TargetLineWidth += 100;
      console.log("You're in the Target");
    }
  }

  drawGrid() {
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
  drawTarget() {
    this.ctx.save();
    this.ctx.beginPath();
    this.Target.draw(LEVELS[this.level].targetsAngle, 0.5);
    this.ctx.lineWidth = this.TargetLineWidth;
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawStick() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.Stick.draw(this.arrayElements, this.posXSitckyPoint);
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.closePath();
  }
}

export default App;
