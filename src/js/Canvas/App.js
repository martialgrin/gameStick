import { map, calcRadian, lerp, radianToDegree } from "../Utils";
import PARAMS from "../PARAMS";
import { preProcessArrayParts } from "../PositionCalcs/Parts";
import LEVELS from "../LEVELS";
import checkPartAndTarget from "../levelLogic/checkPartAndTarget";
import DrawStick from "./DrawStick";
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
    this.space = this.w / this.nbBallsGrid;
    this.posXSitckyPoint = 0;
    this.init();
    this.changeLevel = false;
  }
  // Initialise le stick pours plus tard
  init() {
    if (PARAMS.dev.state) {
      this.level = PARAMS.game.initialLevel - 1;
    } else {
      this.level = 0;
    }
    this.loadBasicParamsForSketch();
    this.Stick = new DrawStick(this.ctx);
    this.Target = new DrawStick(this.ctx);
    this.checkIfModelIsLoaded();
  }
  loadBasicParamsForSketch() {
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

<<<<<<< HEAD
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

  // Main Loop
  draw() {
    if (PARAMS.dev.state != true) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // const counter = AnalyzePixels(this.ctx);
    this.processAngles();
    this.checkLevel();
<<<<<<< HEAD

    // this.drawGrid();
=======
<<<<<<< Updated upstream
=======
    AnalyzePixels();
    // this.drawGrid();
>>>>>>> Stashed changes
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
    this.drawTarget();
    this.drawStick();
    requestAnimationFrame(this.draw.bind(this));
  }

  checkLevel() {
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
  // Data recieved from ML5
  getData(datas) {
    this.ElementsParts = preProcessArrayParts(datas, this.level);
  }
  // Change Level Logic
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
