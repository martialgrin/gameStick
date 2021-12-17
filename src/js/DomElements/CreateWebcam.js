let video;

import PARAMS from "../PARAMS";
import videoManStanding from "../../images/videoManStanding.mp4";
import level_2 from "../../images/level_2.mp4";

const createContainer = () => {
  video = document.createElement("video");
  document.body.appendChild(video);

  switch (PARAMS.video.width) {
    case 0:
      video.width = window.innerWidth;
      break;

    default:
      video.width = PARAMS.video.width;

      break;
  }
  switch (PARAMS.video.height) {
    case 0:
      video.height = window.innerHeight;
      break;
    default:
      video.height = PARAMS.video.height;
      break;
  }
  PARAMS.video.obj = video;
  loadVideo();
};

const loadVideo = () => {
  if (PARAMS.dev.videoStream) {
    video.src = level_2;
    video.muted = true;

    video.play();
    video.loop = true;
    PARAMS.video.videoIsReady = true;
  } else {
    // console.log(navigator.mediaDevices.enumerateDevices());
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        // this.video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        PARAMS.video.videoIsReady = true;
      });
    }
  }
};

export { createContainer };
