import { lerp } from "../../Utils";

class Points {
  constructor(ctx, x, y, r, c) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.pR = r;
    this.basicR = r;
    this.c = c;
    this.changeState = false;
    this.count = 0;
    this.odd = 0;
    this.odd = y / r;
    this.init();
  }

  init() {
    if (this.odd % 2 != 0) {
      this.x += this.r / 2;
    }
    this.y = this.y - this.r / 2;
  }

  show(r, c) {
    this.r = r;
    this.c = c;
    if (this.pR != this.r) {
      this.r = lerp(this.pR, this.r, 0.2);
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y - this.r / 1.5, this.r / 2, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.fillStyle = this.c;
    this.ctx.closePath();
    this.pR = this.r;
  }
}

export default Points;
