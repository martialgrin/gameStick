import { POSES } from "../ML5/POSES";
import { map, calcSin, calcHypotenus } from "../Utils";
import PARAMS from "../PARAMS";

class StickMan {
  constructor() {
    this.canvas = PARAMS.canvas.obj;
    this.ctx = PARAMS.canvas.ctx;
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.nbBallsGrid = 50;
    this.poses = POSES.key;
    this.init();
    this.widthOfLine = 100;
  }

  init() {
    this.checkIfModelIsLoaded();
  }
  checkIfModelIsLoaded() {
    if (PARAMS.poseNet.isLoaded) {
      this.poses = POSES.key;
      console.log(this.poses);
      this.draw();
    } else {
      requestAnimationFrame(this.checkIfModelIsLoaded.bind(this));
    }
  }
  draw() {
    this.poses = POSES.key;
    const spaceX = this.w / this.nbBallsGrid;
    const spaceY = this.h / this.nbBallsGrid;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let x = spaceX; x < this.w; x += spaceX) {
      for (let y = spaceX; y < this.h; y += spaceX) {
        this.ctx.beginPath();
        this.ctx.fillRect(x, y, 1, 1);
        this.ctx.closePath();
      }
    }
    // for (let i = 0; i < this.poses.length; i++) {
    //   if (this.poses[i].score > 0.01) {
    //     if (PARAMS.poseNet.someoneIsFront) {
    //       const x = this.poses[i].position.x;
    //       const y = this.poses[i].position.y;
    //       this.ctx.beginPath();
    //       switch (this.poses[i].part) {
    //         case "nose":
    //           this.calcHeadSize();
    //           break;
    //         case "leftShoulder":
    //           this.calcSkeleton();
    //           break;
    //         case "rightShoulder":
    //           this.calcArmRight();
    //           break;
    //         case "leftHip":
    //           this.calcArmLeft();
    //           break;
    //         default:
    //           this.ctx.arc(x, y, 3, 0, Math.PI * 2, false);
    //           this.ctx.fillStyle = "red";
    //           break;
    //       }
    //       this.ctx.fill();
    //       this.ctx.closePath();
    //     }
    //   }

    requestAnimationFrame(this.draw.bind(this));
  }

  calcHeadSize() {
    this.ctx.fillStyle = "blue";
    const head = this.poses[0].position;
    const rightEar = this.poses[4].position;
    const leftEar = this.poses[3].position;
    const spaceBetween = calcHypotenus(
      Math.abs(leftEar.x - rightEar.x),
      Math.abs(leftEar.y, rightEar.y)
    );
    let rotationHead = (rotationHead = calcSin(
      leftEar.y,
      rightEar.y,
      spaceBetween
    ));

    if (leftEar.y < rightEar.y) {
      rotationHead = -rotationHead;
    }
    this.ctx.ellipse(
      head.x,
      leftEar.y,
      (leftEar.x - rightEar.x) / 1.9,
      (leftEar.x - rightEar.x) * 0.8,
      rotationHead * 2,
      0,
      Math.PI * 2,
      false
    );
    // this.ctx.beginPath();
    // this.ctx.arc(head.x, head.y, 10, 0, Math.PI * 2, false);
    // this.ctx.fillStyle = "black";
    // this.ctx.closePath;
  }
  calcSkeleton() {
    this.ctx.fillStyle = "blue";
    this.ctx.strokeStyle = "blue";
    const leftShoulder = this.poses[5].position;
    const rightShoulder = this.poses[6].position;
    const leftHip = this.poses[11].position;
    const rightHip = this.poses[12].position;
    this.ctx.moveTo(rightHip.x, rightHip.y);
    this.ctx.lineTo(leftHip.x, leftHip.y);
    this.ctx.lineTo(leftShoulder.x, leftShoulder.y);
    this.ctx.lineTo(rightShoulder.x, rightShoulder.y);
    this.ctx.lineTo(rightHip.x, rightHip.y + this.widthOfLine / 2);
    this.ctx.lineWidth = this.widthOfLine;
    this.ctx.stroke();
  }
  calcArmRight() {
    const rightShoulder = this.poses[6].position;
    const rightElbow = this.poses[8].position;
    const rightWrist = this.poses[10].position;
    this.ctx.moveTo(rightShoulder.x, rightShoulder.y);
    this.ctx.lineTo(rightElbow.x, rightElbow.y);
    this.ctx.lineTo(rightWrist.x, rightWrist.y);
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(0, 0, 200, 0)";
    this.ctx.lineWidth = this.widthOfLine;
  }
  calcArmLeft() {
    const leftShoulder = this.poses[5].position;
    const leftElbow = this.poses[7].position;
    const leftWrist = this.poses[9].position;
    this.ctx.moveTo(leftShoulder.x, leftShoulder.y);
    this.ctx.lineTo(leftElbow.x, leftElbow.y);
    this.ctx.lineTo(leftWrist.x, leftWrist.y);
    this.ctx.stroke();
    this.ctx.fillStyle = "rgba(0, 0, 200, 0)";
    this.ctx.lineWidth = this.widthOfLine;
  }
}

//Tan

export default StickMan;
