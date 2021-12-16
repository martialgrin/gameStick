/******** To Draw StickMan and Target*********/

import PARAMS from "../PARAMS";

class DrawStick {
  constructor(ctx) {
    this.width = PARAMS.canvas.width;
    this.height = PARAMS.canvas.height;
    this.arrayRadian = [];
    this.ctx = ctx;
    this.angles = [];
  }
  // from Drawstick with
  draw(angles, startPosX) {
    this.angles = angles;
    this.drawStartingPoint(startPosX);
    for (let i = 0; i < this.angles.length; i++) {
      if (i == 0) {
        this.drawLine(this.angles[i], 0);
      } else {
        this.drawLine(this.angles[i], this.angles[i - 1]);
      }
    }
    this.restorePath();
    this.ctx.restore();
  }

  drawStartingPoint(startPosX) {
    this.ctx.save();
    this.ctx.translate(startPosX * this.width, 0.9 * this.height);
    this.ctx.moveTo(0, 0);
  }

  drawLine(angle) {
    // if (PARAMS.dev.state) {
    //   console.log(angle);
    // }
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
