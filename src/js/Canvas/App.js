import PARAMS from "../PARAMS";
import { preProcessArrayParts } from "../PositionCalcs/Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
import calcPosStickyStartPoint from "../PositionCalcs/calcPosStickyStartPoint";
import calcAngles from "../PositionCalcs/calcAngles";
import { animationInTarget } from "./animationTarget";
import Grid from "./Grid";

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
    this.ElementsParts = [];
    this.posXSitckyPoint = 0;
    this.init();
  }
  init() {
    if (PARAMS.dev.state) {
      this.level = PARAMS.game.initialLevel - 1;
    } else {
      this.level = 0;
    }
    this.loadBasicParamsForSketch();
    this.Stick = new DrawStick(this.ctx);
    this.Target = new DrawStick(this.ctx);
    this.Grid = new Grid(this.ctx, this.w, this.h);
    this.checkIfModelIsLoaded();
  }
  loadBasicParamsForSketch() {
    /*********************************
    variables to be reload each level
    *********************************/
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.lineWidth = PARAMS.stick.lineWidth;
    this.target = {
      isInside: false,
      baseLineWidth: this.lineWidth + PARAMS.targetStick.lineWidth,
      isInsideCount: 0,
      isOutsideCount: 0,
      lineWidth: this.lineWidth + PARAMS.targetStick.lineWidth,
      maxLineWidth: 0,
    };
  }
  checkIfModelIsLoaded() {
    /*********************************
    Start le sketch uniquement quand 
    le modèle de PosNet est starté
    *********************************/
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
  processAngles() {
    this.posXSitckyPoint = calcPosStickyStartPoint(
      this.ElementsParts[0][0].position.x
    );
    this.arrayElements = calcAngles(this.ElementsParts);
  }
  draw() {
    /*********************************
    Call all Main Functions  
    *********************************/
    if (PARAMS.dev.state != true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.drawTarget();
    /*********************************
     counter = all Pixels you analyze 
     you send the infos in grid
    *********************************/
    // const counter = AnalyzePixels(this.ctx);
    // this.Grid.draw(counter);
    this.Grid.draw();
    this.processAngles();
    this.checkLevel();
    this.drawStick();
    requestAnimationFrame(this.draw.bind(this));
  }
  checkLevel() {
    /*********************************
    Check each angles if They are In
    *********************************/
    this.PartsInsideTarget = checkPartAndTarget(
      this.arrayElements,
      LEVELS[this.level].targetsAngle,
      this.level
    );

    if (this.PartsInsideTarget) {
      this.target = animationInTarget(this.target);
      if (this.target.isInsideCount == 80) {
        this.selectLevel(this.level + 1);
      }
      console.log("is Inside");
    } else {
      if (this.target.isInside) {
        this.target.maxLineWidth = 0;
        this.target.isInside = false;
        this.target.isInsideCount = 0;
      }
      // console.log(this.target.baseLineWidth, this.target.lineWidth);
      if (this.target.lineWidth > this.target.baseLineWidth) {
        this.target.isOutsideCount += 2;
        this.target.lineWidth -= 50;
      }
    }
  }
  drawTarget() {
    this.ctx.save();
    this.ctx.beginPath();
    this.Target.draw(LEVELS[this.level].targetsAngle, 0.5);
    this.ctx.lineWidth = this.target.lineWidth;
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
  getData(datas) {
    /*********************************
    Data Received From ML5 
    *********************************/
    this.ElementsParts = preProcessArrayParts(datas, this.level);
  }
  selectLevel(e) {
    if (PARAMS.dev.state) {
      if (e.code == "Digit" + e.key) {
        this.level = e.key - 1;
        this.loadBasicParamsForSketch();
      }
    }
    if (typeof e == "number") {
      this.level = e;
      this.loadBasicParamsForSketch();
    }
    console.log("Level Selected: " + this.level + 1);
  }
}

export default App;
