const PARAMS = {
  dev: {
    state: true, //all Tools for Developement
    videoStream: false,
  },
  window: {
    width: 720,
    height: 1280,
  },
  game: {
    state: 1, // introduction = 0, game = 1 etc.
    initialLevel: 1,
  },
  loader: {
    loop: true,
    loopEnd: false,
    id: "loader",
    speed: 1,
    size: 200,
    minDuration: 4000, //in ms
    explode: false,
  },
  grid: {
    // 715 x 971 px
    columns: 25,
    rows: 55,
  },
  stick: {
    lineWidth: 15,
  },
  targetStick: {
    lineWidth: 10, // to add from the stick lineWidth
  },
  canvas: {
    id: "main-container",
    obj: null,
    ctx: "2d",
    width: null, // if Null define a width as window.innerWidth
    height: null, // if Null define a width as window.innerHeight
    pixelRatio: 3,
    divisionResolution: 6,
  },
  video: {
    width: 135, //270-Screen MID - 0 for window width - it will be the same size for the canvas
    height: 240, //480-Screen MID - 0 for window height - it will be the same size for the canvas
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
    opt2: {
      c1: 0xf01a53,
      c2: 0x02bab7,
      c3: 0xf0c701,
      bg: 0xffffff,
    },
    opt3: {
      c1: 0x359ede,
      c2: 0xab4218,
      c3: 0x4d5178,
      bg: 0xe6965a,
    },
    opt1: {
      c1: 0x00ffff,
      c2: 0xaa00dd,
      c3: 0xcccccc,
      c4: 0xaacccc,
      bg: 0xffffff,
    },
  },
};

export default PARAMS;
