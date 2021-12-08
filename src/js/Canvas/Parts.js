/******* MODULE TO CREATE AN ARRAY ONLY FOR VIEWS PARTS *********/
/******* STATE -- FINISHED*********/

import { difference } from "../Utils";
import LEVELS from "../LEVELS";
import NEWLEVELS from "../NEWLEVELS";

const PartsViewed = (datas, id) => {
  const array = [];
  for (let i = 0; i < LEVELS[id].body.length; i++) {
    const body = LEVELS[id].body[i];
    if (body.difference == true) {
      const point = {
        part: body.name,
        position: {
          x: difference(
            datas[body.parts[0]].position.x,
            datas[body.parts[1]].position.x
          ),
          y: difference(
            datas[body.parts[0]].position.y,
            datas[body.parts[1]].position.y
          ),
        },
      };
      array.push(point);
    } else {
      array.push(datas[body.parts]);
    }
  }
  return array;
};

const AngleBetweenElements = (datas, id) => {
  const array = [];
  for (let i = 0; i < NEWLEVELS[id].body.length; i++) {
    const body = NEWLEVELS[id].body[i];
    const element = [];
    element.push(DefinePoint(body.start, datas));
    element.push(DefinePoint(body.end, datas));
    array.push(element);
  }
  return array;
};

// To create an object with only 1 x and 1 y
const DefinePoint = (elem, datas) => {
  let point;
  if (typeof elem == "object") {
    point = {
      position: {
        x: difference(datas[elem[0]].position.x, datas[elem[1]].position.x),
        y: difference(datas[elem[0]].position.y, datas[elem[1]].position.y),
      },
    };
  } else {
    point = datas[elem];
  }
  return point;
};

export { AngleBetweenElements, PartsViewed };
