import { elastic } from "../Utils";
const animationInTarget = (target) => {
  target.isInside = true;
  target.isInsideCount++;
  /****************************************
       Code When You're stick is in the target
       ***************************************/
  target.lineWidth = elastic(
    target.isInsideCount,
    target.baseLineWidth,
    4000,
    100
  );
  return target;
};

const animationOutTarget = () => {};

export { animationInTarget, animationOutTarget };
