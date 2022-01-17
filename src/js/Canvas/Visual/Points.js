import { lerp, map, lerpHex } from "../../Utils";
import * as PIXI from "pixi.js";
import PARAMS from "../../PARAMS";

class Points {
  constructor({ radius, scale, x, y, column, row }) {
    this.x = ~~PARAMS.grid.columns / 2 + 0.3;
    this.y = ~~PARAMS.grid.rows / 2 + 0.3;
    this.newX = x;
    this.newY = y;
    this.column = column;
    this.row = row;
    this.radius = radius;
    this.scale = scale;
    this.smoothScale = scale;
    this.smoothPosY = this.y;
    this.smoothPosX = this.x;
    this.startColor = 0xffffff;
    this.smoothColor = 0xcccccc;
    this.color = 0xffffff;
    this.stepPos = {
      x: 0.03 + Math.random() * 0.15,
      y: 0.05 + Math.random() * 0.2,
    };
  }

  generate() {
    this.graphics = new PIXI.Graphics();
    const g = this.graphics;
    g.beginFill(this.color, 1);
    g.drawCircle(0, -this.radius, this.radius);
    g.endFill();
    g.x = this.x;
    g.y = this.y + this.radius;

    this.setScale(this.scale);
  }

  update() {
    this.smoothScale = lerp(this.smoothScale, this.scale, 0.2);
    this.smoothColor = lerpHex(this.smoothColor, this.color, 0.2);
    // prettier-ignore
    this.smoothPosX = lerp(this.smoothPosX,this.x, this.stepPos.x);
    // prettier-ignore
    this.smoothPosY = lerp(this.smoothPosY,this.y, this.stepPos.y);
    // console.log(this.smoothPosY);
    // this.smoothPosX = this.x;
    // this.smoothPosY = this.y;

    this.graphics.scale.x = this.smoothScale;
    this.graphics.scale.y = this.smoothScale;
    this.graphics.tint = this.smoothColor;
    this.graphics.x = this.smoothPosX;
    this.graphics.y = this.smoothPosY;
  }

  setColor(rgbArray) {
    this.color = rgbArray;
  }

  setScale(newScale) {
    this.scale = newScale;
  }

  setPos() {
    this.x = this.newX;
    this.y = this.newY;
    // console.log(this.x);
  }
}

export default Points;
