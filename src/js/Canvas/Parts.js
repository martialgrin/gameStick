import { difference } from "../Utils";
import LEVELS from "../LEVELS";

// Tronc position fixe ou pieds
// Chaque élement à un angle variable mais une longueur fixe

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

export { PartsViewed };
