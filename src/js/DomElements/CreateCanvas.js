import PARAMS from "./../PARAMS";

let canvas;

const createCanvas = (id) => {
  canvas = document.createElement("canvas");
  canvas.id = id;
  document.body.appendChild(canvas);
  setSize(PARAMS.video.width, PARAMS.video.height);
  PARAMS.canvas.obj = canvas;
  const ctx = PARAMS.canvas.ctx;
  PARAMS.canvas.ctx = canvas.getContext(ctx);
};

const setSize = (w, h) => {
  switch (w) {
    case 0:
      PARAMS.canvas.width = canvas.width = window.innerWidth;
      break;

    default:
      PARAMS.canvas.width = canvas.width = w;
      break;
  }
  switch (h) {
    case 0:
      PARAMS.canvas.height = canvas.height = window.innerHeight;
      break;

    default:
      PARAMS.canvas.height = canvas.height = h;
      break;
  }
};

export { createCanvas, setSize };
