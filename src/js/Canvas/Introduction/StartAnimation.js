import PARAMS from "../../PARAMS";

export default class StartAnimation {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.w = w;
    this.h = h;
    this.lineLength = 0.01;
    this.init();
  }
  init() {
    this.body = document.getElementsByTagName("body")[0];
    this.initMessage();
    console.log(this.body);
  }

  initMessage() {
    this.welcomeContainer = document.createElement("div");
    this.textContainer = document.createElement("div");
    this.text = document.createElement("p");
    this.text.textContent = "Welcome";
    this.welcomeContainer.setAttribute("id", "welcome-container");
    this.textContainer.setAttribute("id", "message-container");
    this.body.prepend(this.welcomeContainer);
    this.welcomeContainer.appendChild(this.textContainer);
    this.textContainer.appendChild(this.text);
  }
  start() {
    console.log("Start Animation");
  }
  setLineLength(lineLength) {
    const num = lineLength + 0.01;
    return num;
  }
}
