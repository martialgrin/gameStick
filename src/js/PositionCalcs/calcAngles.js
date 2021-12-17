import { calcRadian, lerp } from "../Utils";

let LastAnglesArray = [];

const calcAngles = (arrayElems) => {
  const array = [];
  for (let i = 0; i < arrayElems.length; i++) {
    const start = arrayElems[i][0].position;
    const end = arrayElems[i][1].position;
    let angle = calcRadian(start.x, start.y, end.x, end.y);
    // Prevent for the first call
    if (LastAnglesArray.length != 0) {
      angle = lerp(LastAnglesArray[i], angle, 0.2);
    }
    array.push(angle);
  }
  // Store Last Element for the Next Frame (Essentially for the Lerp)
  LastAnglesArray = array;

  return array;
};

export default calcAngles;
