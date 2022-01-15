import { lerp, map, lerpHex } from "../../Utils";
import * as PIXI from "pixi.js";

class Points {
  constructor({ radius, scale, x, y, column, row }) {
    this.x = x;
    this.y = y;
    this.column = column;
    this.row = row;
    this.radius = radius;
    this.scale = scale;
    this.smoothScale = scale;
    this.startColor = 0xffffff;
    this.smoothColor = 0xffffff;
    this.color = 0xffffff;
  }

  generate() {
    this.graphics = new PIXI.Graphics();
    const g = this.graphics;
    g.beginFill(this.color, 1);
    g.drawCircle(0, -this.radius, this.radius);
    g.endFill();

    this.setScale(this.scale);
    g.x = this.x;
    g.y = this.y + this.radius;
  }

  update() {
    this.smoothScale = lerp(this.smoothScale, this.scale, 0.5);
    this.smoothColor = lerpHex(this.smoothColor, this.color, 0.5);
    this.graphics.scale.x = this.smoothScale;
    this.graphics.scale.y = this.smoothScale;
    this.graphics.tint = this.smoothColor;
  }

  setColor(rgbArray) {
    this.color = rgbArray;
  }

  setScale(newScale) {
    this.scale = newScale;
  }
}

export default Points;
