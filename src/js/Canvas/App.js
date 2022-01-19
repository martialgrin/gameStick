import PARAMS from "../PARAMS";
import { preProcessArrayParts } from "../PositionCalcs/Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
import calcPosStickyStartPoint from "../PositionCalcs/calcPosStickyStartPoint";
import calcAngles from "../PositionCalcs/calcAngles";
import { animationInTarget, animationOutTarget } from "./animationTarget";
import Grid from "./Visual/Grid";
import AnalyzePixels from "./Visual/AnalyzePixels";

class App {
  constructor() {
    this.canvas = PARAMS.canvas.obj;
    this.pixelDensity = PARAMS.canvas.pixelRatio;
    this.canvas.width = this.w =
      PARAMS.window.width / PARAMS.canvas.divisionResolution;
    this.canvas.height = this.h =
      PARAMS.window.height / PARAMS.canvas.divisionResolution;
    PARAMS.canvas.width = this.w;
    PARAMS.canvas.height = this.h;
    // this.canvas.style.width = this.w "px";
    // this.canvas.style.height = this.h "px";
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
    this.PostTarget = new DrawStick(this.ctx, LEVELS.length - 1);

    //! REPLACE GRID
    this.Grid = new Grid();

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
  draw() {
    /*********************************
    Call all Main Functions  
    *********************************/
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#000";

    this.ctx.globalCompositeOperation = "normal";

    this.drawTargetPost();

    this.ctx.globalCompositeOperation = "screen";

    this.drawTarget();
    this.processAngles();
    this.checkLevel();
    this.drawStick();

    //! debug
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = "#0000ff";
    // this.ctx.arc(this.w / 2, this.h / 2, 10, 0, Math.PI * 2);
    // this.ctx.stroke();
    // this.ctx.lineWidth = this.lineWidth;
    // this.ctx.closePath();

    /*********************************
     counter = all Pixels you analyze 
     you send the infos in grid
    *********************************/
    this.ctx.globalCompositeOperation = "normal";
    // this.ctx.beginPath();
    // this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillStyle = PARAMS.colorScheme.opt1.bg;
    // this.ctx.fill();
    // this.ctx.closePath();

    // this.drawTargetWhite();
    this.ctx.globalCompositeOperation = "screen";
    //! REPLACE GRID
    this.Grid.draw(this.ctx);
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
      if (this.target.isInsideCount >= 120) {
        this.selectLevel(this.level + 1);
      }
      console.log(this.target.isInsideCount);
    } else if (this.target.isInsideCount >= 0) {
      this.target = animationOutTarget(this.target);
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
    // console.log(LEVELS[LEVELS.length - 1]);
    this.PostTarget.draw(
      LEVELS[LEVELS.length - 1].targetsAngle,
      LEVELS[LEVELS.length - 1].startXPosTarget
    );
    this.ctx.lineWidth = this.target.lineWidth;
    this.ctx.strokeStyle = "#0000ff";
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
  startEndTrans() {
    this.Grid.finish(true);
  }
  selectLevel(e) {
    // if (PARAMS.dev.state) {
    if (e.code == "Digit" + e.key) {
      console.log(e.key);
      if (e.key == LEVELS.length + 1) {
        this.startEndTrans();
      } else {
        this.level = e.key - 1;
        this.loadBasicParamsForSketch();
      }
    }

    // }
    if (typeof e == "number") {
      if (e == LEVELS.length) {
        console.log("end");
        this.startEndTrans();
        setTimeout(() => {
          this.Grid.finish(false);
          this.level = 0;
        }, 3000);
        // this.level = 0;
      } else {
        this.level = e;
        this.loadBasicParamsForSketch();
      }
    }
    //To change the path level
    this.Stick.chooseLevel(this.level);
    this.Target.chooseLevel(this.level);
    console.log("Level Selected: " + this.level + 1);
  }
  initListeners() {
    document.addEventListener("keyup", this.selectLevel.bind(this));
  }
  // intro() {
  //   if (PARAMS.dev.state != true) {
  //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   }
  //   this.processAngles();
  //   this.lineWidth = 100;
  //   if (this.lineLength < 0.32) {
  //     this.Stick.setLineLength(this.lineLength);
  //   }
  //   this.checkLevel();
  //   this.drawTarget();
  //   this.drawStick();
  //   requestAnimationFrame(this.intro.bind(this));
  // }
}

export default App;
