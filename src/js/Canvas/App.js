import PARAMS from "../PARAMS";
import { preProcessArrayParts } from "../PositionCalcs/Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
import calcPosStickyStartPoint from "../PositionCalcs/calcPosStickyStartPoint";
import calcAngles from "../PositionCalcs/calcAngles";
import { animationInTarget } from "./animationTarget";
import Grid from "./Visual/Grid";
import StartAnimation from "./Introduction/StartAnimation";
import AnalyzePixels from "./Visual/AnalyzePixels";

class App {
  constructor() {
    this.canvas = PARAMS.canvas.obj;
    this.pixelDensity = 3;
    this.canvas.width = this.w = window.innerWidth * this.pixelDensity;
    this.canvas.height = this.h = window.innerHeight * this.pixelDensity;
    PARAMS.canvas.width = this.w;
    PARAMS.canvas.height = this.h;
    this.canvas.style.width = this.w / this.pixelDensity + "px";
    this.canvas.style.height = this.h / this.pixelDensity + "px";
    this.ctx = PARAMS.canvas.ctx;
    this.ElementsParts = [];
    this.posXSitckyPoint = 0;
    this.stateApplication = PARAMS.game.state;
    this.init();
  }
  init() {
    if (PARAMS.dev.state) {
      this.level = PARAMS.game.initialLevel - 1;
    } else {
      this.level = 0;
    }
    this.loadBasicParamsForSketch();
    this.Stick = new DrawStick(this.ctx, this.level);
    this.Target = new DrawStick(this.ctx, this.level);
    this.Grid = new Grid(this.ctx, this.w, this.h);
    this.StartAnimation = new StartAnimation(
      this.ctx,
      this.w,
      this.h,
      this.Stick
    );
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
      // Start Animation Begin
      this.initListeners();
      // if (PARAMS.dev.state == true && this.stateApplication != 0) {
      //   this.draw();
      // } else {
      //   this.lineLength = 0;
      //   this.level = 0;
      //   this.StartAnimation.start();
      //   this.intro();
      // }
      this.draw();
    } else {
      requestAnimationFrame(this.checkIfModelIsLoaded.bind(this));
    }
  }
  processAngles() {
    this.posXSitckyPoint = calcPosStickyStartPoint(
      this.ElementsParts[0][0].position.x
    );
    this.arrayElements = calcAngles(this.ElementsParts);
  }
  intro() {
    if (PARAMS.dev.state != true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.processAngles();
    this.lineWidth = 300;
    if (this.lineLength < 0.32) {
      this.lineLength = this.StartAnimation.setLineLength(this.lineLength);
      this.Stick.setLineLength(this.lineLength);
    }
    this.checkLevel();
    this.drawTarget();
    this.drawStick();
    requestAnimationFrame(this.intro.bind(this));
  }
  draw() {
    /*********************************
    Call all Main Functions  
    *********************************/
    if (PARAMS.dev.state != true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.ctx.globalCompositeOperation = "screen";
    this.drawTarget();
    this.processAngles();
    this.checkLevel();
    this.drawStick();

    /*********************************
     counter = all Pixels you analyze 
     you send the infos in grid
    *********************************/
    this.ctx.globalCompositeOperation = "normal";

    const counter = AnalyzePixels(this.ctx);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawTargetPost();
    this.drawTargetWhite();
    this.ctx.globalCompositeOperation = "multiply";
    this.Grid.getArray(counter);
    requestAnimationFrame(this.draw.bind(this));
  }
  // You Have to make change here for the check level
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
    this.Target.draw(
      LEVELS[this.level].targetsAngle,
      LEVELS[this.level].startXPosTarget
    );
    this.ctx.lineWidth = this.target.lineWidth;
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawTargetPost() {
    this.ctx.save();
    this.ctx.beginPath();
    this.Target.draw(
      LEVELS[this.level].targetsAngle,
      LEVELS[this.level].startXPosTarget
    );
    this.ctx.lineWidth = this.target.lineWidth;
    this.ctx.strokeStyle = PARAMS.colorScheme.opt1.c3;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawTargetWhite() {
    this.ctx.save();
    this.ctx.beginPath();
    this.Target.draw(
      LEVELS[this.level].targetsAngle,
      LEVELS[this.level].startXPosTarget
    );
    this.ctx.lineWidth = this.target.baseLineWidth - 40;
    this.ctx.strokeStyle = PARAMS.colorScheme.opt1.bg;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawStick() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#00ff00";
    this.Stick.draw(this.arrayElements, this.posXSitckyPoint, this.level);
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
    // if (PARAMS.dev.state) {
    if (e.code == "Digit" + e.key) {
      this.level = e.key - 1;
      this.loadBasicParamsForSketch();
    }
    // }
    if (typeof e == "number") {
      this.level = e;
      this.loadBasicParamsForSketch();
    }
    //To change the path level
    this.Stick.chooseLevel(this.level);
    this.Target.chooseLevel(this.level);
    console.log("Level Selected: " + this.level + 1);
  }
  initListeners() {
    document.addEventListener("keyup", this.selectLevel.bind(this));
  }
}

export default App;
