// Heading

// Ce qu'il faut faire
//calculer l'angle entre deux éléments, ex: tronc, bras etc.
//les mettre ensemble
//

import { calcRadian } from "../Utils";

import PARAMS from "../PARAMS";

class DrawStick {
  constructor(ctx) {
    this.width = PARAMS.canvas.width;
    this.height = PARAMS.canvas.height;
    this.arrayRadian = [];
    this.ctx = ctx;
    this.angles = [];
  }

  draw(angles) {
    this.angles = angles;
    this.drawStartingPoint();
    for (let i = 0; i < this.angles.length; i++) {
      this.drawLine(this.angles[i]);
    }
    this.restorePath();
    this.ctx.restore();
  }

  drawStartingPoint() {
    this.ctx.save();
    this.ctx.translate(0.5 * this.width, 0.5 * this.height);
    this.ctx.moveTo(0, 0);
  }

  drawLine(angle) {
    this.ctx.save();
    this.ctx.rotate(angle);
    this.ctx.lineTo(0, 0.2 * this.height);
  }
  restorePath() {
    for (let i = 0; i < this.angles.length - 1; i++) {
      this.ctx.restore();
    }
  }
}

export default DrawStick;
