const PARAMS = {
  dev: {
    state: true, //all Tools for Developement
    videoStream: false,
  },
  game: {
    initialLevel: 1,
  },

  grid: {
    nbBallsOnWidth: 20,
    color1: "0,0,255",
    color2: "0,255,0",
  },
  stick: {
    lineWidth: 400,
  },
  analyze: {
    tiles: { x: 50, y: 100 },
  },
  targetStick: {
    lineWidth: 100, // to add from the stick lineWidth
  },
  canvas: {
    id: "main-container",
    obj: null,
    ctx: "2d",
    width: null,
    height: null,
  },
  video: {
    width: 270, //270-Screen MID - 0 for window width - it will be the same size for the canvas
    height: 480, //480-Screen MID - 0 for window height - it will be the same size for the canvas
    videoIsReady: false,
    obj: null,
  },
  poseNet: {
    isLoaded: false,
    poses: {
      key: null,
      someoneIsFront: false,
    },
  },
};

export default PARAMS;
