const PARAMS = {
  dev: {
    state: true, //all Tools for Developement
    videoStream: true,
  },
  game: {
    state: 1, // introduction = 0, game = 1 etc.
    initialLevel: 2,
  },

  grid: {
    nbBallsOnWidth: 20,
    color1: "0,0,255",
    color2: "0,255,0",
  },
  stick: {
    lineWidth: 400,
  },
  targetStick: {
    lineWidth: 175, // to add from the stick lineWidth
  },
  canvas: {
    id: "main-container",
    obj: null,
    ctx: "2d",
    width: null, // if Null define a width as window.innerWidth
    height: null, // if Null define a width as window.innerHeight
    analyze: {
      tiles: { x: 10, y: 10 },
    },
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
  colorScheme: {
    opt1: {
      c1: "rgb(240, 26, 83)",
      c2: "rgb(2, 186, 183)",
      c3: "rgb(240, 199, 1)",
      bg: "rgb(255, 255, 255)",
    },
    opt2: {
      c1: "rgb(255, 255, 255)",
      c2: "rgb(0, 0, 255)",
      c3: "rgb(255, 255, 255)",
      bg: "rgb(0, 0, 0)",
    },
  },
};

export default PARAMS;
