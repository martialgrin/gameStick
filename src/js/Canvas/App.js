import PARAMS from "../PARAMS";
import { preProcessArrayParts } from "../PositionCalcs/Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< Updated upstream

import { easeOutCirc } from "js-easing-functions";
=======
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
import { easeElastic, elastic } from "../Utils";
import {
  easeOutCirc,
  easeInOutElastic,
  easeInOutBounce,
} from "js-easing-functions";
import calcPosStickyStartPoint from "../PositionCalcs/calcPosStickyStartPoint";
import calcAngles from "../PositionCalcs/calcAngles";
import { animationInTarget } from "./animationTarget";
<<<<<<< HEAD
=======
import AnalyzePixels from "./AnalyzePixels";
>>>>>>> Stashed changes
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
=======
import calcPosStickyStartPoint from "../PositionCalcs/calcPosStickyStartPoint";
import calcAngles from "../PositionCalcs/calcAngles";
import { animationInTarget } from "./animationTarget";
import Grid from "./Visual/Grid";
import StartAnimation from "./Introduction/StartAnimation";
import AnalyzePixels from "./Visual/AnalyzePixels";
>>>>>>> temp

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
    this.viewGrid = PARAMS.dev.viewGrid;
    this.init();
    this.changeLevel = false;
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
<<<<<<< HEAD
  initListeners() {
    document.addEventListener("keyup", this.selectLevel.bind(this));
    this.draw();
  }

<<<<<<< HEAD
=======
>>>>>>> temp
  processAngles() {
    this.posXSitckyPoint = calcPosStickyStartPoint(
      this.ElementsParts[0][0].position.x
    );
    this.arrayElements = calcAngles(this.ElementsParts);
=======
<<<<<<< Updated upstream
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
=======
  processAngles() {
    // console.log(this.arrayElements);
    // console.log(this.ElementsParts);
    this.posXSitckyPoint = calcPosStickyStartPoint(
      this.ElementsParts[0][0].position.x
    );
    this.arrayElements = calcAngles(this.ElementsParts, this.changeLevel);
    if (this.changeLevel) {
      this.changeLevel = false;
    }
>>>>>>> Stashed changes
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
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
<<<<<<< HEAD
<<<<<<< HEAD

    // this.drawGrid();
=======
<<<<<<< Updated upstream
=======
    AnalyzePixels();
    // this.drawGrid();
>>>>>>> Stashed changes
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
=======
>>>>>>> temp
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
    if (this.viewGrid) {
      this.ctx.globalCompositeOperation = "normal";

      const counter = AnalyzePixels(this.ctx);

      this.ctx.beginPath();
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = PARAMS.colorScheme.opt2.bg;
      this.ctx.fill();
      this.ctx.closePath();

      this.drawTargetPost();
      this.drawTargetWhite();
      this.ctx.globalCompositeOperation = "screen";
      this.Grid.getArray(counter);
    }
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
<<<<<<< HEAD

    if (this.PartsInsideTarget) {
      this.target = animationInTarget(this.target);
      if (this.target.isInsideCount == 80) {
        this.selectLevel(this.level + 1);
      }
      console.log("is Inside");
=======
<<<<<<< Updated upstream
    if (this.PartsInsideTarget) {
      this.target.isInsideCount++;
      /****************************************
       Code When You're stick is in the target
       ***************************************/

      this.target.lineWidth += 100;
      console.log("You're in the Target");
=======

    // console.log(this.arrayElements, LEVELS[this.level].targetsAngle);

    if (this.PartsInsideTarget) {
      this.target = animationInTarget(this.target);
      if (this.target.isInsideCount == 80) {
        this.changeLevel = true;
        this.selectLevel(this.level + 1);
      }
      console.log("is Inside");
>>>>>>> Stashed changes
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
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
    this.ctx.strokeStyle = PARAMS.colorScheme.opt2.c3;
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
    this.ctx.strokeStyle = PARAMS.colorScheme.opt2.bg;
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
