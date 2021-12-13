// Heading

// Ce qu'il faut faire
//calculer l'angle entre deux éléments, ex: tronc, bras etc.
//les mettre ensemble
//
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
  draw(angles) {
    this.angles = angles;
    this.drawStartingPoint();
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

  drawStartingPoint() {
    this.ctx.save();
    this.ctx.translate(0.5 * this.width, 0.2 * this.height);
    this.ctx.moveTo(0, 0);
  }

  drawLine(angle, previousAngle) {
    this.ctx.save();
    this.ctx.rotate(angle);
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
