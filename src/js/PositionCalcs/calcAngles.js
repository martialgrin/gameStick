import { calcRadian, lerp } from "../Utils";

<<<<<<< HEAD
let LastAnglesArray = [];

const calcAngles = (arrayElems) => {
  const array = [];
=======
let LastAnglesArray = [0.0001, 0.0001, 0.0001, 0.0001];

const calcAngles = (arrayElems, changeLevel) => {
  const array = [];

>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
  for (let i = 0; i < arrayElems.length; i++) {
    const start = arrayElems[i][0].position;
    const end = arrayElems[i][1].position;
    let angle = calcRadian(start.x, start.y, end.x, end.y);
    // Prevent for the first call
<<<<<<< HEAD
    if (LastAnglesArray.length != 0) {
=======
    // if (i == arrayElems.length - 1) {
    //   console.log(angle);
    // }
    if (
      LastAnglesArray.length != 0 &&
      arrayElems.length == LastAnglesArray.length
    ) {
>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
      angle = lerp(LastAnglesArray[i], angle, 0.2);
    }

    array.push(angle);
  }
  // Store Last Element for the Next Frame (Essentially for the Lerp)
  LastAnglesArray = array;
  // console.log(array);

<<<<<<< HEAD
=======
  console.log(array);

>>>>>>> f1e1a7a8f3ece5c2a29c68ad74d30f89de1659a7
  return array;
};

export default calcAngles;
