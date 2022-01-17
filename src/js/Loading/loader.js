import { lerp } from "three/src/math/MathUtils";
import PARAMS from "../PARAMS";

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
    this.radius = this.loaderElem.size;

    this.minSizeGrid = this.w / PARAMS.grid.columns;

    this.init();
  }
  init() {
    this.minDuration();
    this.animationLoading();
    document.addEventListener("click", this.transitionClick.bind(this));
  }

  transitionClick() {
    console.log("click");
    PARAMS.loader.loop = false;
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

    this.ctx.clearRect(0, 0, this.w, this.h);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#aa00dd";
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
    this.radius = lerp(this.radius, 0, 0.01);
  }

  onEndLoader() {
    if (this.radius > 1) {
      this.transitionOnEnd();
    }
    this.drawCanvas();
    this.r = this.pulse(this.count * this.loaderElem.speed) * 100 + this.radius;
    if (this.r > 10) {
      requestAnimationFrame(this.onEndLoader.bind(this));
    } else {
      this.endLoader();
    }
  }

  endLoader() {
    console.log("endLoader");
    let elem = document.getElementById(PARAMS.loader.id);
    elem.remove();
  }
}

export default Loader;