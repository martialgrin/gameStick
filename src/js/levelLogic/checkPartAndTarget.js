import LEVELS from "../LEVELS";

const checkPartAndTarget = (parts, targets, idLevel) => {
  const errorMargin = LEVELS[idLevel].errorMargin;
  let count = 0;
  for (let i = 0; i < parts.length; i++) {
    if (
      parts[i] > targets[i] - errorMargin &&
      parts[i] < targets[i] + errorMargin
    ) {
      count++;
    } else {
      return false;
    }
  }
  if (count == parts.length) {
    return true;
  }
};

export default checkPartAndTarget;
