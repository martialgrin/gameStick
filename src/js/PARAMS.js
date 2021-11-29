const PARAMS = {
  dev: {
    state: true, //all Tools for Developement
    videoStream: false,
  },
  game: {
    initialLevel: 1,
  },

  stick: {
    lineWidth: 300,
  },
  canvas: {
    id: "main-container",
    obj: null,
    ctx: "2d",
    width: null,
    height: null,
  },
  video: {
    width: 270, //0 for window width - it will be the same size for the canvas
    height: 480, //0 for window height - it will be the same size for the canvas
    videoIsReady: false,
    obj: null,
  },
  three: {
    scene: {
      cam: {
        left: -1,
        right: 1,
        top: 1,
        bottom: -1,
        near: -1,
        far: 1,
      },
    },
  },
  poseNet: {
    isLoaded: false,
    poses: {
      key: null,
      someoneIsFront: false,
    },
  },

  stickMan: {
    headSize: null,
  },
};

export default PARAMS;
