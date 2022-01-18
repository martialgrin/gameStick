import { lerp } from "three/src/math/MathUtils";
import PARAMS from "../PARAMS";
import { lerpHex } from "../Utils";

let count = 0;

class Loader {
  constructor() {
    this.count = 0;
    this.r = PARAMS.loader.size;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth * devicePixelRatio;
    this.canvas.height = window.innerHeight * devicePixelRatio;
    this.w = this.canvas.style.width = this.canvas.width / devicePixelRatio;
    this.h = this.canvas.style.height = this.canvas.height / devicePixelRatio;
    this.canvas.style.zIndex = 10;
    this.canvas.setAttribute("id", PARAMS.loader.id);
    document.body.appendChild(this.canvas);
    this.loaderElem = PARAMS.loader;
    this.fillColor = PARAMS.colorScheme.opt1.cyan;
    this.endFillColor = PARAMS.colorScheme.opt1.purple;
    this.radius = this.loaderElem.size;
    this.minSizeGrid = this.w / PARAMS.grid.columns;

    this.init();
  }
  init() {
    this.fillColor = lerpHex(this.fillColor, this.endFillColor, 0.01);
    this.ctx.fillStyle = "#aa00dd";

    this.minDuration();
    this.animationLoading();
  }

  minDuration() {
    setTimeout(() => {
      if (!PARAMS.loader.loop) {
        console.log("endMinDuration");
        this.loaderElem.loopEnd = true;
      }
    }, this.loaderElem.minDuration);
  }

  animationLoading() {
    this.drawCanvas();
    this.r =
      this.pulse(this.count * this.loaderElem.speed) * 100 +
      this.loaderElem.size;
    PARAMS.loader.loop = this.loaderElem.loop;
    if (!this.loaderElem.loop && this.loaderElem.loopEnd) {
      this.onEndLoader();
    } else {
      requestAnimationFrame(this.animationLoading.bind(this));
    }
  }

  drawCanvas() {
    this.count += 1;
    this.fillColor = lerpHex(this.fillColor, this.endFillColor, 0.01) || "#fff";
    // console.log(this.fillColor.toString(16));
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#" + this.fillColor.toString(16);
    this.ctx.arc(this.w / 2, this.h / 2, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  pulse(time) {
    const pi = 3.14;
    const frequency = 10; // Frequency in Hz
    return 0.5 * (1 + Math.sin(2 * pi * frequency * time));
  }
  transitionOnEnd() {
    this.r = lerp(this.r, 0, 0.1);
  }

  //   onEndLoader() {
  //     if (this.radius > 1) {
  //       this.transitionOnEnd();
  //     }
  //     this.drawCanvas();
  //     this.r = this.pulse(this.count * this.loaderElem.speed) * 100 + this.radius;
  //     if (this.r > 20) {
  //       requestAnimationFrame(this.onEndLoader.bind(this));
  //     } else {
  //       this.endLoader();
  //     }
  //   }
  onEndLoader() {
    this.transitionOnEnd();

    this.drawCanvas();
    // this.r = this.pulse(this.count * this.loaderElem.speed) * 100 + this.radius;
    if (this.r > 20) {
      requestAnimationFrame(this.onEndLoader.bind(this));
    } else {
      this.endLoader();
    }
  }

  endLoader() {
    PARAMS.loader.explode = true;
    console.log("endLoader");
    let elem = document.getElementById(PARAMS.loader.id);
    elem.remove();
  }
}

export default Loader;
