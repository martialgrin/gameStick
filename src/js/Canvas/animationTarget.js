import { elastic } from "../Utils";
const animationInTarget = (target) => {
  /****************************************
   Code When You're stick is in the target
  ***************************************/
  target.isInside = true;
  target.isInsideCount++;
  target.lineWidth = elastic(
    target.isInsideCount,
    target.baseLineWidth,
    300,
    100
  );
  return target;
};

const animationOutTarget = () => {
  /****************************************
  Code when you go out of the target
  ***************************************/
};

export { animationInTarget, animationOutTarget };
