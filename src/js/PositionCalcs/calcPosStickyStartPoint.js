/********* CALC FIRST POINT OF THE ARRAY*********/
// RETURN A VALUE BETWEEN 0 - 1 TO CORRESPOND TO THE CANVAS WIDTH

import PARAMS from "../PARAMS";
import { map, lerp } from "../Utils";

let lastPos = 0;

const calcPosStickyStartPoint = (pos) => {
  let StickyPos = map(pos, 0, PARAMS.video.width, 0, 1);
<<<<<<< HEAD
  StickyPos = lerp(lastPos, StickyPos, 0.02);
=======
  StickyPos = lerp(lastPos, StickyPos, 0.1);
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7

  lastPos = StickyPos;
  return StickyPos;
};

export default calcPosStickyStartPoint;
