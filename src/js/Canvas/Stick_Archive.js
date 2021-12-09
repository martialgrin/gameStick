// Heading

// Ce qu'il faut faire
//calculer l'angle entre deux éléments, ex: tronc, bras etc.
//les mettre ensemble
//

import { calcRadian } from "../Utils";

import PARAMS from "../PARAMS";

class Stick {
  constructor(ctx) {
    this.width = PARAMS.canvas.width;
    this.height = PARAMS.canvas.height;
    this.arrayRadian = [];
    this.ctx = ctx;
  }

  draw(datas) {
    this.datas = datas;
    this.drawStartingPoint();
    for (let i = 0; i + 1 < datas.length; i++) {
      this.arrayPos = i;
      this.radian = calcRadian(
        this.datas[i].position.x,
        this.datas[i].position.y,
        this.datas[i + 1].position.x,
        this.datas[i + 1].position.y
      );
      this.arrayRadian.push(this.radian);
      if (i == 0) {
        // console.log((this.radian * 180) / Math.PI);
      }
      this.drawLine();
    }
    this.restorePath();
    this.ctx.restore();
  }

  drawStartingPoint() {
    this.ctx.save();
    this.ctx.translate(0.5 * this.width, 0.5 * this.height);
    this.ctx.moveTo(0, 0);
  }

  drawLine() {
    this.ctx.save();
    this.ctx.rotate(this.radian - this.arrayRadian[0]);
    if (this.arrayPos == 1) {
      this.ctx.lineTo(0, 0.4 * this.height);
    } else {
      this.ctx.lineTo(0, 0.2 * this.height);
    }
  }
  restorePath() {
    for (let i = 0; i < this.datas.length - 1; i++) {
      this.ctx.restore();
    }
  }
}

export default Stick;
