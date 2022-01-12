/******** To Draw StickMan and Target*********/

import PARAMS from "../PARAMS";
import LEVELS from "../LEVELS";

class DrawStick {
  constructor(ctx, level) {
    this.width = PARAMS.canvas.width;
    this.height = PARAMS.canvas.height;
    this.arrayRadian = [];
    this.ctx = ctx;
    this.countIntro = 0;
    this.angles = [];
    this.level = level;
    this.lineLength = 0.3;
    this.pathLevel = LEVELS[this.level].path;
    this.c = "#00ff00";
  }
  chooseLevel(level) {
    this.level = level;
    this.pathLevel = LEVELS[this.level].path;
  }

  setLineLength(e) {
    this.lineLength = e;
  }

  // from Drawstick with
  draw(angles, startPosX) {
    if (this.level == 0) {
      this.countIntro += 0.001;
      this.angles = angles;
      this.drawStartingPoint(startPosX);

      for (let i = 0; i < this.angles.length; i++) {
        if (i == 0) {
          this.drawLine(this.angles[i], 0);
        } else {
          if (i == 3) {
            this.drawHead();
          }
          if (this.pathLevel[i] == 0) {
            this.drawLineIntro(this.angles[i], this.angles[i - 1]);
          } else if (this.pathLevel[i] == 1) {
            // CREATE A NEW PATH
            this.drawNewPath(i);
          }
        }
      }
      this.restorePath();
      this.ctx.restore();
    } else {
      this.ctx.beginPath();

      this.angles = angles;
      this.drawStartingPoint(startPosX);
      for (let i = 0; i < this.angles.length; i++) {
        if (i == 0) {
          this.drawLine(this.angles[i], 0);
        } else {
          if (i == 3 && this.level == 0) {
            this.drawHead();
          }
          if (this.pathLevel[i] == 0) {
            this.drawLine(this.angles[i], this.angles[i - 1]);
          } else if (this.pathLevel[i] == 1) {
            // CREATE A NEW PATH
            this.drawNewPath(i);
          }
        }
      }
      this.restorePath();
      this.ctx.restore();
      this.ctx.closePath();
    }
  }
  drawNewPath(i) {
    // To draw another Path from the main
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
  drawStartingPoint(startPosX) {
    this.ctx.save();
    this.ctx.translate(startPosX * this.width, 0.9 * this.height);
    this.ctx.moveTo(0, 0);
  }
  drawLine(angle) {
    this.ctx.save();
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.lineLength * this.width, 0);
    this.ctx.translate(this.lineLength * this.width, 0);
    this.ctx.rotate(-angle);
  }

  drawLineIntro(angle) {
    this.ctx.rotate(angle);
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.lineLength * this.width, 0);
    this.ctx.translate(this.lineLength * this.width, 0);
    this.ctx.rotate(-angle);
  }

  drawHead() {
    this.ctx.save();
    this.ctx.translate(0, -0.25 * this.width);
    this.ctx.moveTo(0, 0);
    this.ctx.lineWidth = 0;
    this.ctx.arc(0, 0, 60, 0, Math.PI * 2);
    this.ctx.restore();
  }
  restorePath() {
    for (let i = 0; i < this.angles.length; i++) {
      this.ctx.restore();
    }
  }
}

export default DrawStick;
