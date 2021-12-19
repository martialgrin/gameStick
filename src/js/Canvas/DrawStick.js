/******** To Draw StickMan and Target*********/

import PARAMS from "../PARAMS";
import LEVELS from "../LEVELS";

class DrawStick {
  constructor(ctx, level) {
    this.width = PARAMS.canvas.width;
    this.height = PARAMS.canvas.height;
    this.arrayRadian = [];
    this.ctx = ctx;
    this.angles = [];
    this.level = level;
    this.pathLevel = LEVELS[this.level].path;
  }
  chooseLevel(level) {
    this.level = level;
    this.pathLevel = LEVELS[this.level].path;
  }
  // from Drawstick with
  draw(angles, startPosX) {
    this.ctx.beginPath();

    this.angles = angles;
    this.drawStartingPoint(startPosX);
    for (let i = 0; i < this.angles.length; i++) {
      if (i == 0) {
        this.drawLine(this.angles[i], 0);
      } else {
        if (this.pathLevel[i] == 0) {
          // You have to remember how many times it pass in the J
          this.drawLine(this.angles[i], this.angles[i - 1]);
        } else if (this.pathLevel[i] == 1) {
          this.ctx.save();
          this.drawLine(this.angles[i], this.angles[i - 1]);
          for (let j = i + 1; j < this.angles.length; j++) {
            if (this.pathLevel[j] == this.pathLevel[j - 1]) {
              // this.ctx.arc(0, 0, 50, Math.PI * 2, 0);
              this.ctx.fill();
              i = i + 1;
              this.ctx.save();
              this.drawLine(this.angles[j], this.angles[j - 1]);
              this.ctx.restore();
              this.ctx.restore();
            }
          }
          this.ctx.restore();
        }
      }
    }
    this.restorePath();
    this.ctx.restore();
    this.ctx.closePath();
  }
  drawStartingPoint(startPosX) {
    this.ctx.save();
    this.ctx.translate(startPosX * this.width, 0.9 * this.height);
    this.ctx.moveTo(0, 0);
  }
  drawLine(angle) {
    this.ctx.save();
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0.3 * this.width, 0);
    this.ctx.translate(0.3 * this.width, 0);
    this.ctx.rotate(-angle);
  }
  restorePath() {
    for (let i = 0; i < this.angles.length; i++) {
      this.ctx.restore();
    }
  }
}

export default DrawStick;
